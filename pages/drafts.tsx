import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'
import { findData } from "../mangoo/mangoo";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
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
  const {data: session}= useSession();

  if (!session) {
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
