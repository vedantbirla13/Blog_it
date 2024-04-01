"use client";

import { useFormState } from "react-dom";
import styles from "./LoginForm.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/action";

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(login, undefined);

//   useEffect(() => {
//     state?.success && router.push("/");
//   }, [state?.success, router]);

  return (
    <div>
      <form action={formAction} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          autoComplete="off"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          required
        />

        <button>Login</button>
        <span className={styles.error}>{state?.error}</span>
        <Link href="/register">
          Don't have an account <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
