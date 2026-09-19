import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { UserAccess } from "@/app/utils/types";
import { decryptPassword } from "@/app/utils/algorithms";
import jwt from 'jsonwebtoken';


export async function POST(req:Request) {
    
    const body =( await req.json() ) as UserAccess

    const {username,password} =  body ;
    const decryptedPassword=decryptPassword(password);

    const NEWHASH=await bcrypt.hash(decryptedPassword,12)
  
    console.log(`the decrypted password is ${decryptedPassword}`)

    console.log(`username from first check ${username}`)

    console.log(`username from first check trim ${username.trim()}`)

   if (username.trim() !== process.env.GRABBIT_USERNAME?.trim() ){
        console.log(`from username : ${username.trim()}`)
        console.log(typeof process.env.GRABBIT_USERNAME)
        console.log(process.env.GRABBIT_USERNAME)
          return NextResponse.json({message:"wrong credentials",success:false},{status:404})
   } 
    
   const password_check = await bcrypt.compare(decryptedPassword,process.env.HASHED_PASSWORD!);


  if (!password_check){
      console.log(`from password`)

    return NextResponse.json({message:"wrong credentials",success:false},{status:404})
  
  }

      const token=jwt.sign(
        {role:'admin'},
        process.env.JWT_SECRET!,
        {expiresIn:'1h'}
    )

    
const response = NextResponse.json({message:"credentials matched", success: true },{status:200});

response.cookies.set("adminToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60,
});

  return response


//   const hash=await bcrypt.hash('ubuntu12',12);
//   console.log(`hash is ${hash} `)


    // return NextResponse.json({message:"successfully tested",success:true},{status:200})


}