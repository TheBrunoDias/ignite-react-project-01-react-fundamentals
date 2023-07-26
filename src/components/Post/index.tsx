
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { useState } from 'react';
import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './style.module.css';

export type PostProps = {
  id: number;
  author: {
    name: string;
    avatar_url: string;
    role: string;
  }
  publishedAt: Date;
  content: {
    type: 'paragraph' | 'link';
    link?: string;
    content: string;
  }[];
}

export function Post(props: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>('');

  const { publishedAt } = props;

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true
  });

  const isNewCommentEmpty = newCommentText.length === 0;

  function handleCreateNewComment(event: React.FormEvent) {
    event.preventDefault();

    setComments(prev => [...prev, newCommentText])
    setNewCommentText('');
  }

  function handleNewCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement;
    target.setCustomValidity('');
    setNewCommentText(target.value);
  }

  function handleNewCommentInvalid(event: React.InvalidEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement;
    target.setCustomValidity('Comentário é um campo obrigatório.');
  }

  function deleteComment(comment: string) {
    setComments(prev => prev.filter(p => p !== comment));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={props.author.avatar_url} />
          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {props.content.map(p => {

          if (p.type === 'link') {
            return <p key={p.content}>
              <a href={p.link ?? '#'}>{p.content}</a>
            </p>
          }

          return <p key={p.content}>{p.content}</p>

        })}

      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button
            disabled={isNewCommentEmpty}
            type="submit">
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(c => <Comment key={c} content={c} onDeleteComment={deleteComment} />)}
      </div>
    </article>
  );
}