import pool from "@/DB/db";
import { NextResponse } from "next/server";

export async function POST(id:Request) {
    
    
    try {
    const ID = await id.json();
    
     const actual_query=await pool.query('DELETE FROM notes WHERE id =$1',[ID])

     if ( actual_query.rowCount === 0 ){
        return NextResponse.json({message:"no note was found",success:false},{status:404})
     }
      
      return NextResponse.json({message:"note deleted successfully",success:true},{status:200})

    } catch (error:unknown) {
        console.log(error)
           return NextResponse.json({message:"something went wrong",success:false},{status:500})
    }
}