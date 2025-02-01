import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req:NextRequest){
 const session=await getServerSession();
 if(!session)return NextResponse.json({msg:"Not logged in"});
 const client= new PrismaClient();
 const user=await client.user.findFirst({
   where:{
     email:session.user?.email||""
   }
 })
 return NextResponse.json(user);
}
