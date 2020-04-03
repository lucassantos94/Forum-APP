import { IPostRepo } from '../ipostrepo';
import { Post } from '../../domain/post';
import { Comment } from '../../domain/comment';
import { IPostModel } from '../../../../shared/infra/database/mongoose/model/post';
import { Model } from 'mongoose';
import { ICommentModel } from '../../../../shared/infra/database/mongoose/model/comment';

interface IPersistancePost {
  _id: string;
  text: string;
  userId: string;
  date: Date;
  comments: {
    text: string;
    date: Date;
    userId: string;
  }[];
}
export class PostRepo implements IPostRepo {
  #postModel: Model<IPostModel>;
  constructor(model: Model<IPostModel>) {
    this.#postModel = model;
  }

  private toPersistance(post: Post): IPersistancePost {
    const postModel: IPersistancePost = {
      ...post.props,
      _id: post.id,
    };
    return postModel;
  }

  private toPostDomain(post: IPostModel): Post {
    console.log(post);
    const postProps = {
      userId: post.userId,
      text: post.text,
      comments: post.comments
        ? post.comments.map((comment) => Comment.create(comment.userId, comment.text, comment.date) as Comment)
        : [],
    };
    return Post.create(postProps, post._id) as Post;
  }

  private toCommentDomain(comment: ICommentModel): Comment {
    return Comment.create(comment.userId, comment.text, comment.date) as Comment;
  }

  public async getById(id: string): Promise<Post | undefined> {
    const retrievedPost = await this.#postModel.findById(id);
    if (retrievedPost) {
      return this.toPostDomain(retrievedPost);
    }
  }

  public async create(post: Post): Promise<void> {
    await this.#postModel.create(this.toPersistance(post));
  }

  public async update(post: Post, postId: string): Promise<void> {
    await this.#postModel.updateOne({ _id: postId }, this.toPersistance(post));
  }

  public async getAll(page: number, limit = 15): Promise<Post[]> {
    const skip = page * limit;
    const postsRetrieved = await this.#postModel.find({}, null, { skip, limit });
    return postsRetrieved.map((post) => this.toPostDomain(post));
  }

  public async getAllComments(postId: string, page: number, limit = 15): Promise<Comment[]> {
    const skip = page * limit;
    const skipedLimit = skip + limit;
    const postsRetrieved = await this.#postModel.findById(postId);
    return postsRetrieved?.comments.slice(skip, skipedLimit).map((comment) => this.toCommentDomain(comment)) || [];
  }
}
