import { useState } from 'react';
import styles from './post-tag.module.scss';

const PostTag = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (tag: string) => void;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const onButtonClick = () => {
    setIsSelected((prevValue) => !prevValue);
    onClick(label);
  };

  return (
    <button
      className={`${styles.button} ${isSelected && styles.selected}`}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default PostTag;
