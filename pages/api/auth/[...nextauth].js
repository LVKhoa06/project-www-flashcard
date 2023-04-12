import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";
import { signIn } from "../../../utils/mysql/mysql";

const Auth = (req, res) =>
  NextAuth(req, res, {
    pages: {
      signIn: "/sign-in",
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    providers: [
      CredentialsProviders({
        async authorize(info) {
          const { nickname, password } = info;

          let result = await signIn(nickname, password);

          if (!result.data) throw new Error(result.message);

          return result.data;
        }, // authorize
      }), // CredentialsProviders
    ], // providers
    secret: process.env.NEXT_PUBLIC_SECRET,

    callbacks: {
      async session({ session, token, user }) {
        session.accessToken = token.accessToken;
        session.user.nickname = token.nickname;
        session.user.ho = token.ho;
        session.user.id = token.id;
        session.user.ten = token.ten;
        session.user.ngay_sinh = token.ngay_sinh;
        return session;
      },
      async jwt({ token, account, user }) {
        if (account) {
          token.accessToken = account.access_token;
          token.id = user.id;
          token.nickname = user.nickname;
          token.ho = user.ho;
          token.ten = user.ten;
          token.ngay_sinh = user.ngay_sinh;
        }
        return token;
      },
    },
  }); // Auth

export default Auth;
