// pages/api/auth/[...nextauth].ts
import { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
  providers: [
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findFirst({
          where: {
            OR: [
              { username: credentials.identifier },
              { email: credentials.identifier },
            ],
            isActive: true,
          },
          include: { role: true },
        });

        if (!admin) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role.name,
          type: "admin",
        };
      },
    }),
    CredentialsProvider({
      id: "user-login",
      name: "User Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          type: "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
  },
};
