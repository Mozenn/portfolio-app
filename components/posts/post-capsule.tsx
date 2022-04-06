import styles from "./post-capsule.module.scss";
import { Post } from "../../types/post";
import Link from "next/link";

const PostCapsule = ({ postData }: { postData: Post }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.capsuleImage}
        src={`${postData.bannerPath}`}
        alt='capsule image'
      />
      <Link href={`/posts/${postData.id}`}>
        <a>
          <h2 className={styles.title}>{postData.title}</h2>
        </a>
      </Link>
      <div className={styles.bottomContainer}>
        <div className={styles.tagContainer}>
          {postData.tags.map((tag: string) => {
            return <label key={tag}>{tag}</label>;
          })}
        </div>
        <label className={styles.date}>{postData.date}</label>
      </div>
    </div>
  );
};

export default PostCapsule;
