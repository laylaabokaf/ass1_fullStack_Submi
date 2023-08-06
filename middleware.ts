


//import { jwtVerify} from 'jose';  
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
//import { loginDetailsProp } from './pages/_app';




const onlyLoggedInURLs = ['drafts', 'create', 'api/post', 'api/publish', 'api/upload' , 'profile']

const checkToken = async (request: Request) => {
  console.log("check token ..");
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
