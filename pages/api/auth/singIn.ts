//singin :
//cheack if user allready at database
//create hashed pass
//add user to database
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password ,email , name } = req.body;
    //find if user allready exist
    const existUser = await prisma.user.findMany({
        where: {
            username: username,
        }
      });
      const existEmail = await prisma.user.findMany({
        where: {
            email: email,
        }
      });
      if(existUser.length > 0){
        console.log("trying to singIn with exist user name")
        return res.status(403).json({
            error: "User with this username already exists"
        })
      }
      if(existEmail.length > 0){
        console.log("trying to singIn with exist Email")
        return res.status(403).json({
            error: "User with this email already exists"
        })
      }
//create hashed pass
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password,10).then(function(hash: string){
    return hash;
});
if(!hashedPassword){
    console.log(`hashed function failed `);
}

//finally , add user to dataBass
const newUser = await prisma.user.create({
    data: {
      username: username,
      hashedPassword: hashedPassword,
      email: email,
      name: name,
    },
  });

}