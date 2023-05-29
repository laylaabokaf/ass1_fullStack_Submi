import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { findData } from "../mangoo/mangoo";
import Video from "./Video";
export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  videoPublicId:string
};



const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  function hasVedio(){
    if(post.videoPublicId != undefined){
      console.log(`post with id ${post.id} conten a video with url ${post.videoPublicId}`);
      return <Video video = {{publicId : post.videoPublicId}}></Video>
    }
    else{
      console.log(`post with id ${post.id} Dont have video`)
      return <></>;
    }
  }
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      {hasVedio()}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
