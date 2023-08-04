//import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import prisma from "../lib/prisma";
import { getCookie } from "cookies-next";

// 
const App = ({ Component, pageProps }: AppProps) => {

  
  
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
