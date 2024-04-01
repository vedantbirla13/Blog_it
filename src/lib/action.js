"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (previousState, formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);
  // console.log(title, desc, slug, userId, img);
  // console.log(formData)

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img
    });

    await newPost.save();
    console.log("Saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  // console.log(formData)

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGithubLogout = async () => {
  "use server";
  await signOut("github");
};

export const registerUser = async (previousState, formData) => {
  const { username, email, password, confirmPassword, img } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "User already exists!!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("Saved to db");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!!" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", {
      username,
      password,
    });
  } catch (error) {
    console.log(error);
    if (
      error.type === "CredentialsSignin" &&
      error.kind === "signIn" &&
      error.code === "credentials"
    ) {
      return { error: "Invalid username or password!!" };
    } else {
      throw error;
    }
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, img, isAdmin } = Object.fromEntries(formData);
  // console.log(formData)

  try {
    connectToDb();

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      img,
      isAdmin
    });

    await newUser.save();
    console.log("Saved to db");
    revalidatePath("/admin");
  } catch (error) {
    // console.log(error);
    return { error: "Something went wrong!!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  // console.log(formData)

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!!" };
  }
};
