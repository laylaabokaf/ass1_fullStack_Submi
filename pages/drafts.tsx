import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
//import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'
import { findData } from "../mangoo/mangoo";
import { loginDetailsProp } from "../components/Header";
import Cookies from "js-cookie";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //const session = await getSession({ req });
  // if (!session) {
  //   res.statusCode = 403;
  //   return { props: { drafts: [] } };
  // }
  //let currentUser = Cookies.get("LogInToken");
  let currentUser = req.cookies.LogInToken;
 // let logindata:loginDetailsProp;
   if (!currentUser) {
       res.statusCode = 403;
       return { props: { drafts: [] } };
     }
    let logindata =JSON.parse(currentUser)
console.log(`drefts email is ${ logindata.user.email }`)
  const drafts = await prisma.post.findMany({
    where: {
      author: { email: logindata.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  let urls = await findData(drafts.map((p)=>p.id));
 // console.log(urls);
  const draftsWithUrl = drafts.map((post) =>({
    ...post,
    videoPublicId: urls[post.id],
  }));
  return {
    props: { draftsWithUrl },
  };
};

type Props = {
  draftsWithUrl: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const [loginDetails, setLoginDetails] = useState<loginDetailsProp | null>(null);
  
  useEffect(() => {
    if (!loginDetails) {
        const user = Cookies.get("LogInToken");
        console.log(user);
        if(user){
         let parsedUser =  JSON.parse(user);
        const userLogedIn: loginDetailsProp = {};
        userLogedIn.email = parsedUser.user.email;
        userLogedIn.username = parsedUser.user.username;
        userLogedIn.name = parsedUser.user.name;
        userLogedIn.id = parsedUser.user.id;
        setLoginDetails(userLogedIn);
         }
    }
},[]);
  

  if (!loginDetails) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
console.log(props.draftsWithUrl);
  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.draftsWithUrl.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
