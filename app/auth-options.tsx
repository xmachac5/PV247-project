import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession, type DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    }
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      console.log("session callback", session, user);
      return {
        ...session,
      }
    }
  },
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
                password: credentials?.password,
                email: credentials?.email,
              },
            });
          console.log(user);

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            console.log("here");
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return { id: "1", name: "J Smith", email: "jsmith@example.com" };

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          return null;
        }
      }
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);