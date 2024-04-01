"use server"
import React from 'react'
import styles from "./adminPosts.module.css"
import { getPosts } from '@/lib/data'
import Image from 'next/image'
import { deletePost } from '@/lib/action'

const AdminPosts = async() => {

    const posts = await getPosts()


  return (
    <div className={styles.container}>
        <h1>Posts</h1>
        <div className={styles.posts}>
        {
            posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <div className={styles.detail}>
                        <Image src={post.img || "/noAvatar.png"} width={50} height={50} />
                        <span className={styles.postTitle}>{post.title}</span>
                    </div>

                    <form action={deletePost}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className={styles.postButton}>delete</button>
                    </form>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default AdminPosts