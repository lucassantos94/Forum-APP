import { IUserRepo } from '../../../user/repo/iuserrepo';
import { IPostRepo } from '../../repo/ipostrepo';
import { Comment } from '../../domain/comment';

export class GetAllPostComments {
  #userRepo: IUserRepo;
  #postRepo: IPostRepo;
  constructor(userRepo: IUserRepo, postRepo: IPostRepo) {
    this.#postRepo = postRepo;
    this.#userRepo = userRepo;
  }

  public async execute(
    postId: string,
    userId: string,
    page: number,
  ): Promise<
    | {
        text: string;
        userId: string;
        date: Date;
      }[]
    | undefined
  > {
    const user = await this.#userRepo.getById(userId);
    if (user) {
      return (await this.#postRepo.getAllComments(postId, page)).map((comment) => comment.props);
    }
  }
}
