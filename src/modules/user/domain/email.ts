export class Email {
  #email: string;
  private constructor(email: string) {
    this.#email = email;
  }

  public static create(email: string): Email | undefined {
    const validationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validEmail: boolean = validationRegex.test(email);

    if (validEmail) {
      return new Email(email);
    }
  }

  get email(): string {
    return this.#email;
  }
}
