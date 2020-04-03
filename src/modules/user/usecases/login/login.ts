import { IUserRepo } from '../../repo/iuserrepo';

export class Login {
  #userRepo: IUserRepo;
  constructor(repo: IUserRepo) {
    this.#userRepo = repo;
  }

  public async execute({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }): Promise<[boolean, { id: string; email: string }?]> {
    const user = await this.#userRepo.getByEmail(email);
    if (user) {
      const correctPass = user.checkPassword(pass);
      if (correctPass) {
        return [
          true,
          {
            id: user.id,
            email: user.props[0].email,
          },
        ];
      }
    }
    return [false];
  }
}
