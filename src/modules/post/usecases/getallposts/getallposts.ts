import { IUserRepo } from '../../../user/repo/iuserrepo';
import { IPostRepo } from '../../repo/ipostrepo';

interface PostProps {
  id: string;
  text: string;
  userId: string;
  date: Date;
}
export class GetAllPosts {
  #userRepo: IUserRepo;
  #postRepo: IPostRepo;
  constructor(userRepo: IUserRepo, postRepo: IPostRepo) {
    this.#postRepo = postRepo;
    this.#userRepo = userRepo;
  }

  public async execute(userId: string, page: number): Promise<PostProps[] | undefined> {
    const user = await this.#userRepo.getById(userId);
    if (user) {
      const posts = await this.#postRepo.getAll(page);
      return posts.map((post) => {
        const props = post.props;
        return {
          id: props.id,
          userId: props.userId,
          text: props.text,
          date: props.date,
        };
      });
    }
  }
}
