import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { loginDetailsProp } from '../../../components/Header';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { csrf } from '../../../scrf';
// PUT /api/publish/:id
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

const login = req.cookies.LogInToken
if (req.method === "PUT") {
  if (login) {
    const postAuther = await prisma.post.findMany({
      where: {
        id:Number(postId) 
      }});

     const login_Json = JSON.parse(login);
     if( postAuther[0].authorId === login_Json.user?.id){
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.json(post);} }
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

export default csrf(handle);