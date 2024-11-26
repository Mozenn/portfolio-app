import styles from './post-capsule.module.scss';
import capsuleStyles from '../capsule.module.scss';
import { Post } from '../../types/post';
import Link from 'next/link';

const PostCapsule = ({
  postData,
  scrollSnapEnabled = true,
}: {
  postData: Post;
  scrollSnapEnabled?: boolean;
}) => {
  return (
    <article
      className={`${styles.container} ${capsuleStyles.container} ${scrollSnapEnabled && capsuleStyles.scrollSnap}`}
    >
      <Link href={`/posts/${postData.id}`}>
        <div className={capsuleStyles.capsuleImageContainer}>
          <img
            className={capsuleStyles.capsuleImage}
            src={`${postData.bannerPath}`}
            alt="capsule image"
          />
        </div>
        <h2 className={styles.title}>{postData.title}</h2>
        <div className={styles.bottomContainer}>
          <div className={styles.tagContainer}>
            {postData.tags.map((tag: string) => {
              return <label key={tag}>{tag}</label>;
            })}
          </div>
          <label className={styles.date}>{postData.date}</label>
        </div>
      </Link>
    </article>
  );
};

export default PostCapsule;
