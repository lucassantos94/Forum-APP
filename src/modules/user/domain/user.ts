import { Email } from './email';
import { Password } from './password';
import { v4 as uuid } from 'uuid';
interface UserProps {
  alias: string;
  pass: Password;
  user: string;
  email: Email;
}
export interface PlainUserProps {
  user: string;
  pass: string;
  email: string;
  alias: string;
}
export class User {
  #props: UserProps;
  #id: string;
  private constructor(props: UserProps, id: string) {
    this.#props = props;
    this.#id = id;
  }

  get id(): string {
    return this.#id;
  }

  public static async create(
    {
      user,
      pass,
      email,
      alias,
      hash,
    }: {
      user: string;
      pass?: string;
      email: string;
      alias: string;
      hash?: string;
    },
    id?: string,
  ): Promise<User | undefined> {
    const validPass = await Password.create({ pass, hash });
    const validEmail = Email.create(email);
    const newUser = !!id === false;
    if (validEmail && validPass) {
      const userProps = {
        alias,
        email: validEmail,
        pass: validPass,
        user,
      };

      return new User(userProps, newUser ? uuid() : (id as string));
    }
  }

  public async checkPassword(pass: string): Promise<boolean> {
    return this.#props.pass.compare(pass);
  }

  get props(): [PlainUserProps, string] {
    const props: PlainUserProps = {
      user: this.#props.user,
      pass: this.#props.pass.pass,
      email: this.#props.email.email,
      alias: this.#props.alias,
    };
    return [props, this.#id];
  }
}
