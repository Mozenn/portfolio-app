import styles from "./access-link.module.scss";

const AccessLink = ({ iconName, url }) => {
  return (
    <div>
      <a className={styles.container} href={url} target='_blank'>
        <img
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
