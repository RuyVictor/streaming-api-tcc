export class Token {
  id?: string;
  hash: string;
  created_at?: Date;

  private constructor({ hash }: Token) {
    return Object.assign(this, {
      hash,
    });
  }

  static create({ hash }: Token) {
    const token = new Token({ hash });
    return token;
  }
}
