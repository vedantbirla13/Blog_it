import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/data";

// Fetch post with an api
// We can directly fetch data where we want
// const getData = async () => {
//   // We can make the data refetch or refresh again after the specific time
//   const res = await fetch(`http://localhost:3000/api/blog`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

// Fetch post without an api

const BlogPage = async() => {

  // Fetch post with an api
  // const posts = await getData();

  // Fetch post without an api
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
