import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";

const login = async(credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username })

    if(!user){
      throw new Error("Wrong credentials")
    }

  const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

  if(!isPasswordCorrect) throw new Error("Invalid credentials")

  return user;
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user
        } catch (error) {
          return null
        }
      }
    })
  ],

  // Once we are logged in we can access all the information of the user
  // like provider (here github), name, email, followers etc, and we can find
  //  that user in the database if it already exists then directly display the user
  //  If not then create a new user in the database
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user);

      // We check first is the provider github if yes the proceed
      // Then we find the user if it already exist in database
      // If not then create new

      if (account.provider === "github") {
        connectToDb();
        // Find that person in the database
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
              // isAdmin: 
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      

      return true;
    },

    // We are authnticating the users access to different pages
    // but if we write auth function here then it wont work because we 
    // are using node js libraries like brcyptjs etc and middleware
    // is independent of all these libraries. so to prevent this we will create a 
    // new file auth.config and import it from there
    // authorized({ auth, request }){
    // }

    ...authConfig.callbacks
  },
});
