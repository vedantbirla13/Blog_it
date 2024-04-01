"use client";

import { useFormState } from "react-dom";
import styles from "./adminUserForm.module.css";
import { addUser } from "@/lib/action";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  return (
    <form className={styles.container} action={formAction}>
      <h1>Add New User</h1>
      <input
        type="text"
        placeholder="Enter your username"
        name="username"
        autoComplete="off"
      />
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        autoComplete="off"
        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        title="Please enter a valid email address"
      />
      <input
        type="password"
        placeholder="Enter your password"
        name="password"
      />
      <input type="text" placeholder="Enter your image (optional)" name="img" />
      <select name="isAdmin">
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button>Add</button>
      <span className={styles.error}>{state && state.error}</span>
    </form>
  );
};

export default AdminUserForm;
