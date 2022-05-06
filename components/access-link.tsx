import { useTheme } from '../hooks/useTheme';
import styles from './access-link.module.scss';

const AccessLink = ({ iconName, url }: { iconName: string; url: string }) => {
  const { getFilterClass } = useTheme();

  return (
    <div>
      <a
        className={styles.container}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={`${styles.icon} ${getFilterClass()}`}
          src={`/images/${iconName}`}
          alt={`${iconName} icon`}
        />
        <p className={`${styles.link}`}>{url}</p>
      </a>
    </div>
  );
};

export default AccessLink;
