import React from 'react'
import styles from "./postUser.module.css"
import Image from 'next/image'
import { getUser } from '@/lib/data'

// Fetch data with an api
// const getData = async(userId) => {
//     const res = await fetch(`https://dummyjson.com/users/${userId}`, { cache: "no-store" })
//      return res.json()
// }   

// Fetch data without an api


const postUser = async({ userId }) => {
    // Fetch post with an api
    // const user = await getData(userId)
    
    // Fetch post without an api
    const user = await getUser(userId)
  return (
    <div className={styles.container}>
        <Image
        className={styles.avatar}
        src={user?.image ? user?.image : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      /> 
      <div className={styles.details}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user?.username}</span>
      </div>
    </div>
  )
}

export default postUser