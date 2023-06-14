//log in request is send
//1.cheack if user exist 
//2.cheack if password is true
//3.set token 

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'




export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const bcrypt = require("bcrypt");
    const { username, password } = req.body;

    const result = await prisma.user.findMany({
        where:{
          username: username
        }
      });
 if(result.length !== 1){
    console.log("user not found")
    return res.status(403).json({
        error: "User with this username dosent exists"
    })
 }

 const correctPass = await bcrypt.compare(password, result[0].hashedPassword);

if(correctPass){
    //set token for log in 

}else{
    return res.status(401).json({
        error: 'invalid username or password'
      })
}

}