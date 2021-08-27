import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "../../styles/post.module.scss";
import Layout from "../../components/layout";
import { getAllPostIds, getPostFullData } from "../../lib/posts";
import { Post } from "../../types/post";
import { IdParams } from "../../types/IdParams";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IdParams;
  const postFullData = getPostFullData(id);

  return {
    props: {
      postFullData,
    },
  };
};

const PostPage = ({ postFullData }: { postFullData: Post }) => {
  return (
    <Layout>
      <Head>
        <title>{postFullData.title}</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>{postFullData.title}</h1>
        <div className={styles.infoContainer}>
          <label className={styles.infos}>{`${postFullData.author} | ${postFullData.date}`}</label>
          <label className={styles.timeEstimate}>{`${postFullData.timeEstimate} min read`}</label>
        </div>
        <div className={styles.tagContainer}>
          {postFullData.tags.map((tag) => {
            return <label>{tag}</label>;
          })}
        </div>
        <div
          className={styles.contentText}
          dangerouslySetInnerHTML={{ __html: postFullData.content as string }}
        />
      </div>
    </Layout>
  );
};

export default PostPage;
