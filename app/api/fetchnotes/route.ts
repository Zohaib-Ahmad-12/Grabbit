import { NextResponse } from "next/server";
import pool from "@/DB/db";


export async function GET() {



    try {
        const res = await pool.query('SELECT * FROM notes')

        if (res.rows.length === 0) {
             return NextResponse.json({ message: "empty table", success: true, result: res.rows }, { status: 200 })
        }
        return NextResponse.json({ message: "done done", success: true, result: res.rows }, { status: 200 })

    } catch (error:unknown) {

        if (error instanceof Error){
            return NextResponse.json({ message: "failed, from Error",error, success: false, }, { status: 401 })
        }

        return NextResponse.json({ message: "failed, something was thrown", success: false, }, { status: 401 })


    }







}