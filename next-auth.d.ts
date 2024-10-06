/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      type: string;
      email: string;
      username?: string;
      role?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    type: string;
    username?: string;
    role?: string;
    avatar?: string;
  }
}
