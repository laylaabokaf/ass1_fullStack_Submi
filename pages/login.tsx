import { useState } from 'react';
import Layout from "../components/Layout";
import Router from 'next/router';
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';
import { data } from 'autoprefixer';
import  {setup} from '../scrf';
import { GetServerSideProps } from "next";

const LoginPage: React.FC =  () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setloginFail] = useState(false);



  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // console.log(password)
  
    

 const response = await fetch('/api/auth/logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      //response.headers.set(,);
      //save user data 
   //   response.headers()
   // Cookies.set('token',JSON.stringify(token));
   if (response.status === 200) {
    const data = await response.json();
    let token = data.token;
    let username = data.username;
    let name = data.name;
    let id = data.id;
    let email = data.email;

   // setCookie('token', data.token)
   // setCookie('username',data.username)
   Cookies.set("LogInToken",JSON.stringify({user: {username: username, email: email,name:name,id: id,token: token}}))
  }
  
 // console.log(getCookie('token'));
      await Router.push("/");
    };  
  

    // Reset form fields
    // setUsername('');
    // setPassword('');


return(
    <Layout>

    <div>
        <h1>
            Login Page
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', marginBottom: '1rem', width: '25%' }}>
            <input
            placeholder="username"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '1rem', width: '25%' }}>
          <input
                      placeholder="Password"

              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ flex: 1 }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem', width: '25%' }}>Login</button>
          </form>
    </div>
    </Layout>

 );



}
//export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

export const getServerSideProps  = setup(async ({  }) => {
  return {
    props: {},
  };
 });
export default LoginPage;