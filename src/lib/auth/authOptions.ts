import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "../connectDb";
import { isPassMatch } from "@/utils/hashedPassword";
import User from "@/models/userModel";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: any): Promise<any>{
                // Connect to db
                try {
                    await connectDb();
                } catch (error) {
                    console.error("Error connecting to database:", error);
                    throw new Error("Database connection error");
                }

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please provide all fields");
                }
                const user = await User.findOne({email: credentials?.email}).select("+password");
                if(!user) throw new Error("User not found");
                if (user) {
                  let isMatch = await isPassMatch(
                    credentials?.password?.toString(),
                    user?.password
                  );
                  if (!isMatch) {
                    throw new Error("Invalid Email or Password");
                  } else {
                    return user;
                  }
                } else {
                  return null;
                }
            },
        }),
    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token.id = user._id?.toString();
                token.role = user.role;
                token.username = user.username;
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.role = token.role;
              }
              return session
          }
    },
    pages:{
        signIn: "/login",
    },
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}