//log in request is send
//1.cheack if user exist 
//2.cheack if password is true
//3.set token 

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Cookies from 'js-cookie';



export default async function handle(req: NextApiRequest, res: NextApiResponse) {

console.log("login api");
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
 console.log(result[0])
 const correctPass = await bcrypt.compare(password, result[0].hashedPassword);

if(correctPass){
  console.log("loged In!")
  console.log(result[0]);

    //set token for log in
    const userForToken = {
      email: result[0].email,
      id: result[0].id,
      username: result[0].username,
      name:result[0].name
    }
    console.log(userForToken);
    //const jose = require('jose')
   // const jwt = require('jsonwebtoken')
    if(process.env.SECRET){
      const token = null ; 
        //   {
        //     status: 200,
        //     headers: { "Content-Type": "application/json" },
        //   }
      //  );

       // res.cookies.set(cookieOptions);
    //   Cookies.set("LogInToken",token)

        res.status(200).send({... userForToken , token: token})

      }
}else{

console.log("password is wrong") 
   return res.status(401).json({
        error: 'invalid username or password'
      })
}

}