import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession, type DefaultSession } from "next-auth";
import bcrypt from "bcrypt";

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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (credentials) {
            const user = await prisma.user.findFirst({
              where: {
                email: credentials.email,
              },
            });

            if (user && (await bcrypt.compare(credentials.password, user.password))) {
              // Passwords match
              return user;
            } else {
              // Passwords don't match
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);