import { NextRequest,NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client"
import { signIn } from "next-auth/react";
const client=new PrismaClient();
export async function POST(req:NextRequest){
  const body=await req.json();
  const userExist=await client.user.findFirst({
    where:{
      email:body.email,
    }
  })
  if(userExist)return NextResponse.json({msg:"User already exists"},{status:403})
try{
  const user= await client.user.create({
    data:{
      name:body.name,
      email:body.email,
      password:body.password
    }
  })
  console.log(user);
  console.log("above")
  return NextResponse.json({
    msg:"User signed up"
  },{status:200})
}catch(e){
  console.log(e);
  return NextResponse.json({
    msg:"some error occured with db"
  },{status:403})
}
}
