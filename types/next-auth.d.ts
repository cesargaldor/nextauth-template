import NextAuth, { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      phone?: number;
    } & DefaultUser;
  }

  interface User extends DefaultUser {
    phone?: number;
    error?: string;
  }
}
