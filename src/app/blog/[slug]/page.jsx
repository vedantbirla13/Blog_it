import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";


// Fetch data with an api
// We can directly fetch data where we want
// const getData = async (slug) => {
//   console.log(slug)
//  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)

//   return res.json()
// };



export const generateMetadata = async({params}) => {
    const {slug} = params;
    const post = await getPost(slug);

    return {
      title: post.title,
      description: post.desc
    }
}


// destructure the params directly to access the params in the header
const SinglePostPage = async ({ params }) => {

  // slug is basically the params for eg http://localhost:3000/blog/5
  // here 5 is the slug, so it fetches the 5th post
  const {slug} = params

 // Fetch post with an api
  // const post = await getData(slug)
  
  // Fetch post without an api
  const post = await getPost(slug)
  
  console.log(post)
  return (
    <div className={styles.container}>


      {(
        <div className={styles.imgContainer}>
          <img src={post?.img || "/noimage.jpg"} alt={post.title} fill className={styles.img} height="550px" width="500px"  />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
             </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4,16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.title}</div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;