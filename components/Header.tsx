import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import Cookies from "js-cookie";
//import { request } from "http";
//import { getUserInfoByCookie } from "../pages/_app";
export type loginDetailsProp = {
 // token?: string,
  email?: string,
  username?: string,
  name?: string,
  id?: Number
}

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
  router.pathname === pathname;
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
        userLogedIn.id = parsedUser.user.id;;
        setLoginDetails(userLogedIn);
         }
    }
},[]);
  //const {data: session, status} = useSession();

  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (!loginDetails) {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!loginDetails) { //!loged in
    right = (
      <div className="right">
        <Link href="login" legacyBehavior>
          <a data-active={isActive("/signup")}>Log in </a>
        </Link>
        <Link href="signup" legacyBehavior>
          <a data-active={isActive("/signin")}>sign up</a>
        </Link>
        
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (loginDetails) { //loged in
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {loginDetails.name}
        </p>
        <Link href="/create" legacyBehavior>
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={()=>{Cookies.remove("LogInToken") 
        setLoginDetails(null)
        Router.push("/")}}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
