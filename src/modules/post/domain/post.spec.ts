import { Post } from './post';
import { Comment } from './comment';

describe('Post create', () => {
  let postProps: { userId: string; text: string; comments?: Comment[] };

  beforeAll(() => {
    postProps = {
      text: 'testing post',
      userId: '2311321das',
      comments: [],
    };
  });
  describe('return undefined if ', () => {
    test('text is empty string', () => {
      const props = { ...postProps, text: '' };
      expect(Post.create(props)).toBeUndefined();
    });
    test('text is bigger than 500 char', () => {
      const props = { ...postProps, text: 'a'.repeat(501) };
      expect(Post.create(props)).toBeUndefined();
    });
  });
  describe('return Post if ', () => {
    test('valid props', () => {
      expect(Post.create(postProps)).toBeInstanceOf(Post);
    });
  });
});

describe('Post addcomment', () => {
  let commentProps: { userId: string; text: string };
  let post: Post;
  beforeEach(() => {
    const postProps = {
      text: 'testing post',
      userId: '2311321das',
      comments: [],
    };
    commentProps = {
      text: 'testing comment',
      userId: '46546da',
    };
    post = Post.create(postProps) as Post;
  });
  describe('return false if', () => {
    test('text is empty string', () => {
      const { userId } = commentProps;
      expect(post.addComent('', userId)).toBe(false);
    });
    test('text is bigger than 200 char', () => {
      const { userId } = commentProps;
      expect(post.addComent('a'.repeat(201), userId)).toBe(false);
    });
  });
  describe('if valid props', () => {
    test('return true', () => {
      const { userId, text } = commentProps;
      expect(post.addComent(text, userId)).toBe(true);
    });
    test('adds comment to Post', () => {
      const { userId, text } = commentProps;
      post.addComent(text, userId);
      expect(post.props.comments[0].text).toBe(text);
      expect(post.props.comments[0].userId).toBe(userId);
    });
  });
});
