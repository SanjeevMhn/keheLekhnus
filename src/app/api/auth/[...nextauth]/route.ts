import api from "@/app/service/interceptor/interceptor";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  callbacks: {
  },
 // events:{
 //   async signIn({user,account,profile}){
 //     console.log(user,account,profile);
 //   }
 // }
})

export {handler as GET, handler as POST}
