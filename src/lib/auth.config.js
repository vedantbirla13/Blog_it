
// We are preventing the user to access any other page which is restricted 
// to specific user by redirecting it to the login page if not logged in
export const authConfig  = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
           // As we login manually we just get the email. So we have to gather other info as well
          // As we login next-auth creates a jwt token from where we can gather the info   
            async jwt({ token, user }){
                if(user){
                    
                    token.id = user.id
                    token.isAdmin = user.isAdmin
                    token.username = user.username
                }
                return token
            },
            async session ({ session, token }){
                if(token){
                    session.user.id = token.id,
                    session.user.isAdmin = token.isAdmin;
                    session.user.username = token.username

                }
                return session
            },
             authorized({ auth, request }){ 
            // console.log(auth)

            const user = auth?.user
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")


            // ONLY ADMIN CAN REACH THE DASHBOARD
            if(isOnAdminPanel && !user?.isAdmin){
                return false
            }
            

            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
            if(isOnBlogPage && !user){
                return false
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE
            if(isOnLoginPage && user){
                return Response.redirect(new URL("/" , request.nextUrl))
            }


            // As we return false it redirects us to the login page
            // return false
            return true
        }
    }
}