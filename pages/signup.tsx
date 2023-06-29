import { useState } from 'react';
import Layout from "../components/Layout";
import Router from 'next/router';// import Cookies from 'js-cookie';


const LoginPage: React.FC = () => {


  const errors_dict = {
    "0":
      { "empty_username": "Username must not remain empty" },
    "1":
      { "empty_password": "Password must not remain empty" },
    "2":
    {
      "empty_email": "Email must not remain empty",
      "invalid_mail_format": "Invalid mail format"
    },
    "3":
      { "empty_name": "Name must not remain empty" }
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  //   const [errorFlag, setErrorFlag] = useState(false);
  const [name, setName] = useState('');
  const all_error = [4];
  //   const [loginFail, setloginFail] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);

  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (username === '') {
      all_error[0] = +1;
    }
    if (password === '') {
      all_error[1] = +1;
    }
    if (email === '') {
      all_error[2] = +1;
    }
    if (name === '') {
      all_error[3] = +1;
    }
    console.log(all_error[3]);

    //this is a test for backend ,the singiup page not done yet
  setUsername("layla_6");
  setPassword("126");
  setEmail("layla6@gmail.com");
  //   const [errorFlag, setErrorFlag] = useState(false);
  setName("layla6");
    console.log(`username: ${username} , name: ${name} , password: ${password}`);
  //send data to singup api
  // username, password ,email , name 
  const body = {username,password,email,name};
     let response =  await fetch(`/api/auth/singIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Sign up successful!');
        await Router.push("/login");
      } else {
        //const errorData = await response.json();
        //const errorMessage = errorData.error;
        console.log('Sign up failed. Error:');
      //  setSignupFailMessage(errorMessage);
      }
  
  };


  return (
    <Layout>

      <div>
        <h1>
          Sign Up Page
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
          <div style={{ display: 'flex', marginBottom: '1rem', width: '25%' }}>

            <input
              placeholder="email"

              type="email"
              id="email"
              value={password}
              onChange={handlePasswordChange}
              style={{ flex: 1 }}
            />                        </div>
          <div style={{ display: 'flex', marginBottom: '1rem', width: '25%' }}>

            <input
              placeholder="name"

              type="name"
              id="name"
              value={password}
              onChange={handlePasswordChange}
              style={{ flex: 1 }}
            /></div>
          {/* </div> */}
          <button type="submit" style={{ padding: '0.5rem 1rem', width: '25%' }}>Login</button>
        </form>
      </div>
    </Layout>

  )



}

export default LoginPage;