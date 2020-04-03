import { IUserRepo } from '../iuserrepo';
import { User } from '../../domain/user';
import { IUserModel } from '../../../../shared/infra/database/mongoose/model/user';
import { Model } from 'mongoose';

export class UserRepo implements IUserRepo {
  #model: Model<IUserModel>;
  constructor(model: Model<IUserModel>) {
    this.#model = model;
  }

  async create(user: User): Promise<void> {
    this.#model.create(this.toPersistance(user));
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.#model.findOne({ email });
    const userFound = !!user;
    if (userFound) {
      return this.toDomain(user as IUserModel);
    }
  }

  private async toDomain(userModel: IUserModel): Promise<User> {
    const userProps = {
      hash: userModel.pass,
      alias: userModel.alias,
      email: userModel.email,
      user: userModel.user,
    };
    const user = await User.create(userProps, userModel._id);
    if (user) {
      return user;
    } else {
      throw new Error('Invalid user retrieved from database');
    }
  }

  private toPersistance(
    entity: User,
  ): {
    user: string;
    pass: string;
    email: string;
    alias: string;
    _id: string;
  } {
    const [props, id] = entity.props;
    return {
      ...props,
      _id: id,
    };
  }

  async getById(id: string): Promise<User | undefined> {
    const user = await this.#model.findById(id);
    const userFound = !!user;
    if (userFound) {
      return this.toDomain(user as IUserModel);
    }
  }
}
