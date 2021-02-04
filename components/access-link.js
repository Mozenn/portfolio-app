import styles from "./access-link.module.scss";

const AccessLink = ({ iconName, url }) => {
  return (
    <div>
      <img
        className={styles.icon}
        src={`/images/${iconName}`}
        alt={`${iconName} icon`}
      />
      <p className={styles.link}>{url}</p>
    </div>
  );
};

export default AccessLink;
