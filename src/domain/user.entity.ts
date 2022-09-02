export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  profile_image?: string;

  private constructor({ name, email, password, profile_image }: User) {
    return Object.assign(this, {
      name,
      email,
      password,
      profile_image,
    });
  }

  static create({ name, email, password, profile_image }: User) {
    const user = new User({ name, email, password, profile_image });
    return user;
  }
}
