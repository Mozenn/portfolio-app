import styles from "./access-link.module.scss";
import Image from 'next/image';

const AccessLink = ({ iconName , url } : {iconName: string, url: string}) => {
  return (
    <div>
      <a className={styles.container} href={url} target='_blank' rel='noreferrer'>
        <Image
          className={styles.icon}
          src={`/images/${iconName}`}
          alt={`${iconName} icon`}
        />
        <p className={styles.link}>{url}</p>
      </a>
    </div>
  );
};

export default AccessLink;
