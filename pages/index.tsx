import React, { useEffect, useState } from "react";
import { findData } from "../mangoo/mangoo";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import { Pagination } from "../components/Pagination";
import { Upload } from "../components/Upload";
import Cookies from 'js-cookie';
import { getCookie } from "cookies-next";
import LogRocket from 'logrocket';
LogRocket.init('bewg9k/posts-app');

LogRocket.identify('30', {
  user: 'username":"user3","email":"user3@gmail.com","name":"user3","id":30,"token":"eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSIsImlkIjozMCwidXNlcm5hbWUiOiJ1c2VyMyIsIm5hbWUiOiJ1c2VyMyIsImlhdCI6MTY5MDM3Nzg1N30.OQLugwk7GvRvDbEv1buXyRke7v0dOFG9RdIyOwpQIFE"'});
//import { getUserInfoByCookie } from "./_app";
export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  let urls = await findData( feed.map((p)=>p.id));
  const feedsWithUrl = feed.map((post) =>({
    ...post,
    videoPublicId: urls[post.id],
  }));
  console.log();

 // useEffect(async ()=> {
  // console.log("start sertching for login cookie ..")
  
  //   const cookieUserToken =await Cookies.get("LogInToken");
  //   console.log(`token we git at index.tsx is ${cookieUserToken}` );
  //   if(cookieUserToken){
  //     const decodedToken = await jwtVerify(cookieUserToken, new TextEncoder().encode(process.env.SECRET));
  //     //  console.log(`decodedToken ${decodedToken.payload.username}`);
        
  //   let email = decodedToken.payload?.email?.toString();
  //   console.log(`token we git at index.tsx is ${cookieUserToken} user email is ${email}`);
  //   }
    
 //  })
 //console.log(await getUserInfoByCookie());
  //let userLoged =await  getUserInfoByCookie();
 //let userLoged ={}
  return {
    props: { feedsWithUrl 
      //, userLoged
      },
  };
};


type Props = {
  feedsWithUrl: PostProps[];
//  userLoged: User
};


export type userDetails = {
  token?: string,
  email?: string,
  username?: string,
  name?: string,
  Id?: Number
}

 
  
const Blog: React.FC<Props> = (props) => {
  const [page,setPage] = useState(1);
//  const [userLogedIn,setUserLogedIn] = useState<userDetails|undefined>(undefined);

// useEffect(()=>{
//  // Cookies.set("LogInToken",data.token)
//   const userToken = Cookies.get("LogInToken");
//   if(userToken){
//     console.log(`user token : ${userToken}`)
//   }
// },[]);
  const totalPosts = props.feedsWithUrl.length + 10;
  //console.log(props.userLoged);
  function handlePageChange(newpage:number){
    setPage(newpage) ;
 }


  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feedsWithUrl.slice((page - 1)*10,Math.min(totalPosts,page*10)).map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
        <div className="pagination">
          <Pagination props={{page, totalPosts, handlePageChange }} />
        </div>
      </div>
      <style jsx>{`
      .post {
          background: teal;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
