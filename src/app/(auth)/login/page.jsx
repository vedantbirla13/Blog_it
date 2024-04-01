import { handleGithubLogin, login } from "@/lib/action";
import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./login.module.css";

const Login =  () => {
  // Steps to login using social media accounts
  // First we configure the callback url and the client and secret key of the specific
  // social media profile we need to incorporate in our application
  // Once we get all the details then we create the providers with next-auth
  // Here we want github configuration hence we create a github provide and pass
  // the details like client and secret, also it has signIn and signOut function inbuilt.
  // After that we create the nextAuth folder in api/auth/[...nextAuth] which takes care of
  // all the functionality like error, success etc
  // Now we can access the user using session

  // Instead we can use middleware
  // auth?.user?.isAdmin && Router.push("/")
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
