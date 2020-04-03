import { User } from '../domain/user';

export interface IUserRepo {
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;

  create(user: User): Promise<void>;
}
