import AuthCheck from '../../components/AuthCheck';
import styles from '../../styles/Admin.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { auth, firestore } from '../../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  // use next router to grab slug from url params
  const router = useRouter();
  const { slug } = router.query;

  /* Creating a reference to the post in the database. */
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    // values reference path to post document
    // @ts-ignore
    .doc(slug);
  // with reference we can use hook to listen to post in realtime
  // uncomment second line to turn off realtime data listening
  // @ts-ignore
  const [post] = useDocumentData(postRef);
  // const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <textarea name="content" ref={register}></textarea>

        <fieldset>
          <input
            type="checkbox"
            name="published"
            className={styles.checkbox}
            ref={register}
          />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  );
}
