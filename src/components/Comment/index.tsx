import { ThumbsUp, Trash } from '@phosphor-icons/react';
import styles from './style.module.css';
import { Avatar } from '../Avatar';
import { useState } from 'react';

export type CommentProps = {
  content: string;
  likes?: number;
  onDeleteComment(comment: string): void
};

export function Comment({ content, onDeleteComment, likes = 0 }: CommentProps) {
  const [likeCount, setLikeCount] = useState(likes);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount(prev => ++prev);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/TheBrunoDias.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Bruno Dias</strong>
              <time title="24 de julho às 08:13h" dateTime='2023-07-24 08:13:00'>Cerca de 2h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}