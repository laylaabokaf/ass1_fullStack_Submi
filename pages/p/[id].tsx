import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { deleteData, findData } from "../../mangoo/mangoo";
import Video from "../../components/Video";
import { loginDetailsProp } from "../../components/Header";
import Cookies from "js-cookie";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  let url = await findData([post?.id??-1]);
  console.log(url);
  const postWithUrl = {
    ...post,
    videoPublicId: url[post?.id??-1]}
 // console.log( postWithUrl.videoPublicId);
  return {
    props: postWithUrl ?? { author: { name: "Me" } }
  
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
 // await deleteData(id); ==>Dont work
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  await Router.push("/")
}

const Post: React.FC<PostProps> = (props) => {
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
  //console.log(props);
 // const loginDetails = undefined; //TO-DO
  //const userLoggedIn = Boolean(loginDetails);
  const postBelongsToUser = loginDetails?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  function hasVedio(){

    if(props.videoPublicId != undefined){
       console.log(`post with id ${props.id} conten a video with url ${props.videoPublicId}`);
      return <Video video = {{publicId : props.videoPublicId}}></Video>
    }
    else{
      console.log(`post with id ${props.id} Dont have video`)
      return <></>;
    }
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {hasVedio()}
        {!props.published  && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {  postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
