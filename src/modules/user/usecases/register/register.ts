import { PlainUserProps, User } from '../../domain/user';
import { IUserRepo } from '../../repo/iuserrepo';
export class Register {
  #userRepo: IUserRepo;
  constructor(repo: IUserRepo) {
    this.#userRepo = repo;
  }

  async execute(props: PlainUserProps): Promise<boolean> {
    const userFound = await this.#userRepo.getByEmail(props.email);
    if (userFound === undefined) {
      const user = await User.create(props);
      if (user) {
        this.#userRepo.create(user as User);
        return true;
      }
    }
    return false;
  }
}
