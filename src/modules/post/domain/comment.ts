interface CommentProps {
  text: string;
  userId: string;
  date: Date;
}

export class Comment {
  #props: CommentProps;
  private constructor(props: CommentProps) {
    this.#props = props;
  }

  get props(): CommentProps {
    return {
      ...this.#props,
    };
  }

  public static create(userId: string, text: string, date: Date = new Date()): Comment | undefined {
    if (text.length > 0 && text.length < 200) {
      return new Comment({
        userId,
        text,
        date,
      });
    }
  }
}
