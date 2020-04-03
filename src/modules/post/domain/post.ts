import { v4 as uuid } from 'uuid';
import { Comment } from './comment';
interface PostProps {
  text: string;
  userId: string;
  date: Date;
  comments: Comment[];
}
interface PlainProps {
  id: string;
  text: string;
  userId: string;
  date: Date;
  comments: {
    text: string;
    date: Date;
    userId: string;
  }[];
}

export class Post {
  #props: PostProps;
  #id: string;
  private constructor(props: PostProps, id: string) {
    this.#id = id;
    this.#props = props;
  }

  get id(): string {
    return this.#id;
  }

  get props(): PlainProps {
    return {
      id: this.#id,
      text: this.#props.text,
      date: this.#props.date,
      userId: this.#props.userId,
      comments: this.#props.comments.map((comment) => comment.props),
    };
  }

  public static create(
    props: { userId: string; text: string; comments?: Comment[] },
    id: string = uuid(),
  ): Post | undefined {
    if (props.text.length > 0 && props.text.length < 500) {
      return new Post({ ...props, date: new Date(), comments: props.comments ? [...props.comments] : [] }, id);
    }
  }

  public addComent(text: string, userId: string): boolean {
    const comment = Comment.create(userId, text);
    if (comment) {
      this.#props.comments.push(comment);
      return true;
    }
    return false;
  }
}
