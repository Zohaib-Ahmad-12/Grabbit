import { NextResponse } from "next/server";
import { note } from "@/app/utils/types";
import pool from "@/DB/db";

export async function POST(req: Request) {

    try {
        const body = (await req.json()) as note
        const { text, title } = body

        const result = await pool.query('INSERT INTO notes (text,title) VALUES ($1 , $2) RETURNING *', [text, title])

        console.log(result.rows[0])
        return NextResponse.json({ message: "done", success: true, })

    } catch (error:unknown) {

        if (error instanceof Error){
            console.log('something went wrong from error class', error)
            return NextResponse.json({ message: "failed", success: false, },{status:404})
        }
        else{
            console.log('something else was thrown :',error)
             return NextResponse.json({ message: "failed", success: false, },{status:404})
        }
    }


  



}