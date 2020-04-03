import { IPostRepo } from '../../repo/ipostrepo';
import { IUserRepo } from '../../../user/repo/iuserrepo';
import { Post } from '../../domain/post';

export class CreatePost {
  #postRepo: IPostRepo;
  #userRepo: IUserRepo;
  constructor(postRepo: IPostRepo, userRepo: IUserRepo) {
    this.#postRepo = postRepo;
    this.#userRepo = userRepo;
  }

  public async execute({ userId, text }: { userId: string; text: string }): Promise<boolean> {
    const user = await this.#userRepo.getById(userId);
    if (user) {
      const postProps = {
        userId,
        text,
      };
      const post = Post.create(postProps);
      if (post) {
        await this.#postRepo.create(post);
        return true;
      }
    }
    return false;
  }
}
