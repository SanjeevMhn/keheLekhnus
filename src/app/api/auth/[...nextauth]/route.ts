import { login, setUserData } from "@/app/lib/auth/authSlice";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

let store:any;

export const injectStore = (_store: any) => {
  store = _store;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({user, account}){
      if(account?.provider === 'google'){
        console.log(user, account);
        //TODO send the user id_token or access_token to the backend to verify and create new user or get existing user data
        return true;
      }
      return true;
    }
  },
 
})

export {handler as GET, handler as POST}
