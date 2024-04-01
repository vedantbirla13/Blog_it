"use client"

import {useFormState} from 'react-dom'
import styles from "./adminPostsForm.module.css"
import { addPost } from '@/lib/action'

const AdminPostsForm = ({ userId }) => {


  const [state, formAction] = useFormState(addPost, undefined)
  return (
    <form className={styles.container} action={formAction}>
        <h1>Add New Post</h1>
        <input type="hidden" name='userId' value={userId}/>
        <input type="text" placeholder='Enter your post title' name='title'/>
        <input type="text" placeholder='Enter your post slug. For e.g hello-world' name='slug' autoComplete='off'/>
        <input type="text" placeholder='Enter your posts image link (if any)' name='img'/>
        <textarea type="text" placeholder='Enter your post description' name='desc' rows={10}/>
        <button>Add</button>
        <span className={styles.error}>{state && state.error}</span>

    </form>
  )
}

export default AdminPostsForm