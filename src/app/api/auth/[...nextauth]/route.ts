import { login, setUserData } from "@/app/lib/auth/authSlice";
import { showNotification } from "@/app/lib/notifications/notificationSlice";
import api from "@/app/service/interceptor/interceptor";
import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

let store: any;

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
  events: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        //TODO send the user id_token or access_token to the backend to verify and create new user or get existing user data
        try {
          const authUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-auth`, {
            token: account?.id_token,
            client_id: process.env.GOOGLE_ID
          })
          const data = authUser.data;
          store.getState().dispatch(login(data.accessToken));
          store.getState().dispatch(showNotification({
            message: 'User Logged Successully',
            type: 'success'
          }));
          const getUser = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
          if (getUser.status == 200) {
            const data = getUser.data;

            store.getState().dispatch(setUserData({
              user_id: data.user[0].user_id,
              user_name: data.user[0].user_name,
              user_email: data.user[0].user_email,
              is_admin: data.user[0].user_role === 'admin' ? true : false
            }))

            if (data.user[0].user_role == 'admin') {
              redirect('/admin');

              //window.location.reload();
            } else {
              redirect('/')
              //window.location.reload();
            }

          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  },

})

export { handler as GET, handler as POST }
