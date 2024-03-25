import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/config/mongo-client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  //@ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.phone = user?.phone;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.userId,
          name: token.name,
          email: token.email,
          image: token.image,
          phone: token?.phone,
        },
      };
    },
    async signIn({ user }) {
      if (user?.error) {
        throw new Error(user.error);
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
          });

          if (res.status === 404) {
            return { error: "Usuario no encontrado" };
          }

          return await res.json();
        } catch (error) {
          return { error: "Error en el servidor. Inténtelo más tarde" };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
