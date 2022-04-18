import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
} from 'react-share';
import styles from '../../styles/post.module.scss';
import { getAllPostIds, getPostFullData } from '../../lib/posts';
import { Post } from '../../types/post';
import { IdParams } from '../../types/IdParams';

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
  const shareIconSize = '2.5rem';
  const pageUrl = typeof window !== 'undefined' ? String(window.location) : '';

  return (
    <>
      <Head>
        <title>{postFullData.title}</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>{postFullData.title}</h1>
        <div className={styles.infoContainer}>
          <label
            className={styles.infos}
          >{`${postFullData.author} | ${postFullData.date}`}</label>
          <label
            className={styles.timeEstimate}
          >{`${postFullData.timeEstimate} min read`}</label>
        </div>
        <div className={styles.tagContainer}>
          {postFullData.tags.map((tag) => {
            return <label key={tag}>{tag}</label>;
          })}
        </div>
        <img
          src={postFullData.bannerPath}
          alt="Banner"
          className={styles.banner}
        />
        <div
          className={styles.contentText}
          dangerouslySetInnerHTML={{ __html: postFullData.content as string }}
        />
        <span className={styles.shareBorder}></span>
        <div className={styles.shareContainer}>
          <label>Share</label>
          <FacebookShareButton url={pageUrl} quote={postFullData.title}>
            <FacebookIcon size={shareIconSize} />
          </FacebookShareButton>
          <TwitterShareButton url={pageUrl} title={postFullData.title}>
            <TwitterIcon size={shareIconSize} />
          </TwitterShareButton>
          <LinkedinShareButton url={pageUrl} title={postFullData.title}>
            <LinkedinIcon size={shareIconSize} />
          </LinkedinShareButton>
          <RedditShareButton url={pageUrl} title={postFullData.title}>
            <RedditIcon size={shareIconSize} />
          </RedditShareButton>
        </div>
      </div>
    </>
  );
};

export default PostPage;
