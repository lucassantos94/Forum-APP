import { Post } from '../domain/post';
import { Comment } from '../domain/comment';
export interface IPostRepo {
  create(post: Post): Promise<void>;

  getById(id: string): Promise<Post | undefined>;
  update(post: Post, postId: string): Promise<void>;
  getAll(page: number, limit?: number): Promise<Post[]>;
  getAllComments(postId: string, page: number, limit?: number): Promise<Comment[]>;
}
