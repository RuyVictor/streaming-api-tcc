class Category {
  id?: string;
  name: string;
  image: string;
  have_subcategories?: boolean;
  number_of_streams?: number;
  children?: any;
  parent?: any;

  private constructor({ name, image }: Category) {
    return Object.assign(this, {
      name,
      image,
    });
  }

  static create({ name, image }: Category) {
    const category = new Category({ name, image });
    return category;
  }
}

export { Category };
