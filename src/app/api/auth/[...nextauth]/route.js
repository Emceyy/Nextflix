
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import connect from "@/utils/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        
        await connect();
        
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
         
          return existingUser;
        } else {

          const hashedPassword = await bcrypt.hash(user.id, 5);
        
          const newUser = await User.create({
            username: user.name,
            email: user.email,
           password: hashedPassword,
          });
          
          return newUser;
        }
      }
      return true;
    },
  },  
  
  pages: {
    error: "/login",
  },

});



export { handler as GET, handler as POST };
