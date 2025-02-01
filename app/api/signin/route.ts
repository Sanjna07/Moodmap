import { NextRequest,NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client"
import { signIn } from "next-auth/react";
const client=new PrismaClient();
export async function POST(req:NextRequest){
  const body=await req.json();
  const userExist=await client.user.findFirst({
    where:{
      email:body.email,
      password:body.password
    }
  })
  console.log(userExist)
  if(userExist)return NextResponse.json({msg:"sign in"},{status:200})
  return NextResponse.json({status:403})
}
