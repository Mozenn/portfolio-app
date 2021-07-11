import Layout from "../components/layout";
import { getAllPostsData } from "../lib/posts";
import styles from "../styles/posts.module.scss";
import { Post } from "../types/post";

// export const getStaticProps = async () => {
//   const posts = getAllPostsData();
//   return {
//     props: {
//       posts,
//     },
//   };
// };

const Posts = ({ posts } : {posts: Post[]}) => {
  return (
    <Layout>
      <div className={styles.container}>
        <p>Coming Soon</p>
      </div>
    </Layout>
  );
};

export default Posts;
