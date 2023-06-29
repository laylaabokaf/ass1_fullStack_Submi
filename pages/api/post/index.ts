import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { sendData } from '../../../mangoo/mangoo';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {title, content, loginDetails, email,url} = req.body;
  const login = req.cookies.LogInToken 
   console.log("post hundle email: ")
  console.log(email);
  if (loginDetails) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
      },
    });

 
   sendData(url,new Date() ,result.id ,result.authorId ?? -1) ;
   res.json(result);
  } else {
    console.log("post error");
    // res.status(401).send({ message: 'Unauthorized' })
    res.status(401).send({ message: 'Unauthorized' })

  }
}
