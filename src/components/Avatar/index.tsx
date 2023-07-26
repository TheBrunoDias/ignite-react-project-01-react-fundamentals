import styles from './style.module.css';

type Props = {
  src: string;
  hasBorder?: boolean;
}

export function Avatar({ src, hasBorder = true }: Props) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}