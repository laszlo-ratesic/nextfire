import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import MetaTags from '../../components/Metatags';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post: any;
  let path: string;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // improve Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    /**
     * must be in this format:
     * paths: [
     * { params: { username, slug }}
     * ],
     */
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  // @ts-ignore
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <MetaTags
        title={post.title}
        description={post.content.split(' ').slice(0, 10).join(' ')}
        image={post.image}
      />
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.hearCount || 0} ❤️</strong>
        </p>
      </aside>
    </main>
  );
}
