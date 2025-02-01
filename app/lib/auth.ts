import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID||"",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
        }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            name:{label:'name', type:'text',placeholder:''},
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
              return {
                  id: "user1",
                  name: credentials.name,
                  userId: "asd",
                  //password: credentials.password,
                  email:credentials.email
              };
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: {user:User,token:JWT}) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
    session:({session,token,user}:{session:any,token:JWT,user:User})=>{ 
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      },
//      pages:{
//        signIn:'/signin'
//      }
    },
  }
