import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Upload } from "../components/Upload";
import { sendData } from "../mangoo/mangoo";
import FormData from "form-data";
const Draft: React.FC = () => {
  //const [myFormData, setmyFormData] = useState<FormData>();
  const [title, setTitle] = useState("");
  const [file,setFile] = useState<File>();
  const [formData, setFormData] = useState(new FormData());
  const [content, setContent] = useState("");
  const { data: session, status } = useSession(); 
//  if(myFormData === undefined){
//  setmyFormData(new FormData());}
 // const formData = new FormData();
  let email = session?.user?.email;
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(file);
    let videoPath = undefined;
    let url = undefined;

    if(file != undefined){
   
      console.log("file data is not undefuend");
      let data =  await  uploadVedioToCloundery();
     // url = data.get(secure_url);
      //upload to cloundery
      if(data != null){
        url = data;
        console.log(url);
      }
    }
    try {
      const body = { title, content, session, email,url };
      //upload data to mangoo before post
     let result =  await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      // const data = await result.json();
      // if(data.id != -1){
      //   sendData(url,new Date() ,data.id ,data.authorId) ;
      // }

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };
  
 const uploadVedioToCloundery = async () =>{
    formData?.append("inputFile", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json();
      console.log(data);
      return data.url;
   //   setFile(data.public_id);
   //   console.log(file);
     
    } catch (error) {
      console.log(error);
    return null;
    } 
 }
  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <Upload props={{file, setFile}}></Upload>

          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
