

// const jwt = require('jsonwebtoken')

// // ...
// const getTokenFrom = request:any => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

//   const body = request.body
//   const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token invalid' })
//   }
//   const user = await User.findById(decodedToken.id)





//import { jwtVerify} from 'jose';  
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
////import { loginDetailsProp } from './pages/_app';
//import {  } from 'jose';


export const getUsernameFromCookies = async (request: any) => {
   let username : String | undefined | null
  let token = request.cookies.get('LogInToken').value;
  if (token !== undefined) {
    //const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
  //  console.log(`decodedToken ${decodedToken.payload.username}`);
    //return decodedToken.payload?.email?.toString();
  } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    let token = request.headers.get("Authorization")?.substring(7);
    if (token !== undefined) {
     // const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
    //  console.log(`decodedToken ${decodedToken.payload.username}`);
   // return decodedToken.payload?.email?.toString();
    }
  }
  return null;
}

const onlyLoggedInURLs = ['drafts', 'create', 'api/post', 'api/publish', 'api/upload' , 'profile']

const checkToken = async (request: Request) => {
  console.log("check token ..");
  //console.log(`username is : ${getUsernameFromCookies}`)
  //const loginCookie = request.cookies.get('loginDetails')
  // if (!loginCookie)
  //   return false;
  //const loginDetails: loginDetailsProp = JSON.parse(loginCookie.value);
  //   if (!loginDetails.token)
  //     return false;
  if (!process.env.SECRET) {
    console.log("secret not set");
    return false;
  }
  try {
    //const decodedToken = await jwtVerify(loginDetails.token, new TextEncoder().encode(process.env.SECRET));
    //return decodedToken.payload.email === loginDetails.email;  
  }
  catch {
    return false;
  }
}
export async function middleware(request: NextRequest) {
  // const authorization = request.headers.get('')

  //console.log(request.cookies.get('token')?.value)
 // console.log(`middleware ... request.url is ${request.url}`)
 // console.log(`username is : ${await getUsernameFromCookies(request)}`)
  if (request.url.includes('_next'))
  return null;
  //console.log(request.cookies.get("token")?.value);
  let token = request.cookies.get('LogInToken');

    if (onlyLoggedInURLs.some(path => request.url.includes(path))) {
      if (!token)
        if (request.url.includes('api/'))
          return new NextResponse(
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
          )
        else
        return NextResponse.rewrite(new URL('/', request.url))
    }
    if (request.url.includes('signup')||request.url.includes('login')) {
     // if (await getUsernameFromCookies(request))
      //  return NextResponse.rewrite(new URL('/', request.url))
      return;
    }
    return null;
  }


// See "Matching Paths" below to learn more
export const config = {
  api: {
    bodyParser: false,
  },
};
