import styles from './project-capsule.module.scss';
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
    <div className={styles.capsule}>
      <Link href={`/projects/${id}`}>
        <h3 className={styles.capsuleTitle}>{title}</h3>
      </Link>
      <img
        className={styles.capsuleImage}
        src={`/images/${imageName}`}
        alt="capsule image"
      />
    </div>
  );
}
