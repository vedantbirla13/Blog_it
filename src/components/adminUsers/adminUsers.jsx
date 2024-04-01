import React from 'react'
import styles from "./adminUsers.module.css"
import { getUsers } from '@/lib/data'
import { deleteUser } from '@/lib/action';
import Image from 'next/image';

const AdminUsers = async() => {

    const users = await getUsers();

  return (
    <div className={styles.container}>
         <h1>Users</h1>
         <div className={styles.users}>

         {
         users.map((user) => (
                <div className={styles.user} key={user.id}>
                    <div className={styles.detail}>
                        <Image src={user?.img || "/noavatar.png"} width={50} height={50} />
                        <span className={styles.userTitle}>{user.username}</span>
                    </div>

                    <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <button className={styles.userButton}>delete</button>
                    </form>
                </div>
            ))
        }
         </div>
    </div>
  )
}

export default AdminUsers