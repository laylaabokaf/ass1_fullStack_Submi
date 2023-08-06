//import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import prisma from "../lib/prisma";
import { getCookie } from "cookies-next";

// 
const App = ({ Component, pageProps }: AppProps) => {

  

  
  return (
      <Component {...pageProps} />
  );
};

export default App;
