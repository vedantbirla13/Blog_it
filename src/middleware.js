// We are using middleware to authenticate which page does user have access to and which does not

import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// USing this configuration in the middleware we are returning false
export default NextAuth(authConfig).auth;

// matcher is used so that the middleware is not applied thorought the application
export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
  };
  