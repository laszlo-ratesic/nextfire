import AuthCheck from '../../components/AuthCheck';
import { auth, firestore } from '../../lib/firebase';
import kebabCase from 'lodash.kebabcase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '../../components/PostFeed';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import styles from '../../styles/Admin.module.css';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function AdminPostsPage({}) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  // @ts-ignore
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    // current user's user id
    const uid = auth.currentUser.uid;
    // allows us to make a reference to that user's post collection]
    // referencing document that doesnt exist yet with a value of slug as its id
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    // TIP: Give all fields a default value here
    const data = {
      title,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    // commit doc to firestore
    await ref.set(data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
