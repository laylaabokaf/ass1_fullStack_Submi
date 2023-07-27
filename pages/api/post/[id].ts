import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import {csrf} from '../../../scrf'

// DELETE /api/post/:id
 async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  
  const login = req.cookies.LogInToken  //const loggedUserJSON = req.cookies("token")
  //const session = await getSession({ req })
  console.log("Debag : send login deltels to Delete :");
  console.log(login);
  console.log(`post number ${postId}`);

  if (req.method === "DELETE") {
    if (login) {
      const postAuther = await prisma.post.findMany({
        where: {
          id:Number(postId) 
        }});

       const login_Json = JSON.parse(login);
       if( postAuther[0].authorId === login_Json.user?.id){

      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.json(post);
    }
    } else {
      console.log("post id.ts error")
      res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export default csrf(handle);
