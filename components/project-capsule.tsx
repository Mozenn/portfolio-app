import styles from "./project-capsule.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCapsule({ id, title, imageName } : {id: string, title: string, imageName: string}) {
  return (
    <div className={styles.capsule}>
      <Link href={`/projects/${id}`}>
        <a>
          <h3 className={styles.capsuleTitle}>{title}</h3>
        </a>
      </Link>
      <Image
        className={styles.capsuleImage}
        src={`/images/${imageName}`}
        alt='capsule image'
      />
    </div>
  );
}