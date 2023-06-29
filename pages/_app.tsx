//import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import prisma from "../lib/prisma";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";

// 
const App = ({ Component, pageProps }: AppProps) => {

  const getUserInfoByCookie = async () => {
    let email : String | undefined | null
    let token = await getCookie("token");
    console.log(token)
   // let token = JSON.parse(request.cookies.get('token')).value;
   token = token?.toString();
    if (token !== undefined) {
      const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
    //  console.log(`decodedToken ${decodedToken.payload.username}`);
      return await decodedToken.payload?.email?.toString();
    //return undefined;
    }
    // } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    //   let token = request.headers.get("Authorization")?.substring(7);
    //   if (token !== undefined) {
    //     const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
    //   //  console.log(`decodedToken ${decodedToken.payload.username}`);
    //   return decodedToken.payload?.username?.toString();
    //   
    return undefined;
  }
  
  // export const getUserInfo = async (username: string  | null | undefined) => {
  //   if(username!==undefined && username !== null){
  //   const userData = await prisma.user.findMany({
  //     where: {
  //         username: username,
  //     }
  //   });
  //   return userData[0];
  // }
  // return undefined;
  // }
  
  return (
      <Component {...pageProps} />
  );
};

export default App;
