import { IUserRepo } from '../../../user/repo/iuserrepo';
import { IPostRepo } from '../../repo/ipostrepo';

interface CommentData {
  text: string;
  postId: string;
  userId: string;
}
export class CommentPost {
  #userRepo: IUserRepo;
  #postRepo: IPostRepo;
  constructor(userRepo: IUserRepo, postRepo: IPostRepo) {
    this.#postRepo = postRepo;
    this.#userRepo = userRepo;
  }

  public async execute({ text, postId, userId }: CommentData): Promise<boolean> {
    const user = await this.#userRepo.getById(userId);
    if (user) {
      const post = await this.#postRepo.getById(postId);
      if (post) {
        post.addComent(text, userId);
        await this.#postRepo.update(post, postId);
        return true;
      }
    }
    return false;
  }
}
