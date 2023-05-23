import React, { useState } from "react";

import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import { Pagination } from "../components/Pagination";
import { Upload } from "../components/Upload";
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
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const [page,setPage] = useState(1);
 // const [file, setFile] = useState('');
 // const [filename, setFilename] = useState('');
  const totalPosts = 20;
 function handlePageChange(newpage:number){
    setPage(newpage) ;
 }

  return (
    <Layout>
      <Upload></Upload>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.slice((page - 1)*10,Math.min(totalPosts,page*10)).map((post) => (
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

export default Blog;