import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { loginDetailsProp } from '../../../components/Header';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  //const session = await getSession({ req })
  const [loginDetails, setLoginDetails] = useState<loginDetailsProp | null>(null);
  
  useEffect(() => {
    if (!loginDetails) {
        const user = Cookies.get("LogInToken");
        console.log(user);
        if(user){
         let parsedUser =  JSON.parse(user);
        const userLogedIn: loginDetailsProp = {};
         userLogedIn.email = parsedUser.email;
         userLogedIn.username = parsedUser.username;
         userLogedIn.name = parsedUser.name;
         userLogedIn.id = parsedUser.id;
        setLoginDetails(userLogedIn);
         }
    }
},[]);
  if (loginDetails) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
