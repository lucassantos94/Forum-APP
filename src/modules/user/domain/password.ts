import bcrypt from 'bcrypt';
export class Password {
  #hash: string;
  private constructor(hash: string) {
    this.#hash = hash;
  }

  public static async create({ pass, hash }: { pass?: string; hash?: string }): Promise<Password | undefined> {
    if (hash) {
      return new Password(hash);
    } else if (pass) {
      if (pass.length < 5 || pass.length > 15) return;
      const rounds = Number(process.env.SALTROUNDS || 15);
      const salt = await bcrypt.genSalt(rounds);
      const hash = await bcrypt.hash(pass, salt);
      return new Password(hash);
    }
  }

  public async compare(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.pass);
  }

  get pass(): string {
    return this.#hash;
  }
}
