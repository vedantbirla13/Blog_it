"use client";

import { useFormState } from "react-dom";
import { registerUser } from "@/lib/action";
import styles from "./RegisterForm.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(registerUser, undefined);

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <div>
      <form action={formAction} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
        />
        <button>Register</button>
        <span className={styles.error}>{state?.error}</span>
        <Link href="/login">
          Have an account <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
