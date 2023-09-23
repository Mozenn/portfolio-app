import styles from './project-capsule.module.scss';
import capsuleStyles from './capsule.module.scss';
import Link from 'next/link';

export default function ProjectCapsule({
  id,
  title,
  imageName,
}: {
  id: string;
  title: string;
  imageName: string;
}) {
  return (
    <div className={`${styles.capsule} ${capsuleStyles.container}`}>
      <Link href={`/projects/${id}`}>
        <h2 className={styles.capsuleTitle}>{title}</h2>
        <div className={capsuleStyles.capsuleImageContainer}>
          <img
            className={capsuleStyles.capsuleImage}
            src={`/images/${imageName}`}
            alt="capsule image"
          />
        </div>
      </Link>
    </div>
  );
}
