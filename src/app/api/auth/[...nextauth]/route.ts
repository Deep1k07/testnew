import { authOptions } from "@/lib/auth/authOptions"
import NextAuth from "next-auth" // Referring to the auth.ts we just created

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}