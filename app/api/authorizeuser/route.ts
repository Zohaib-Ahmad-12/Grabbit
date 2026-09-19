import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { UserAccess } from "@/app/utils/types";


export async function POST(req:Request) {
    
    const body =( await req.json() ) as UserAccess

    const {username,password} =  body ;

    console.log(`username:${username} , password:${password}`)



//   const hash=await bcrypt.hash('ubuntu12',12);
//   console.log(`hash is ${hash} `)


    return NextResponse.json({message:"successfully tested",success:true},{status:200})


}