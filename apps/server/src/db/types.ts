export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * User types
 */
export type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
};

export type InsertUser = Prettify<Omit<User, 'password'>>;
export type SelectMultipleUsers = Prettify<
  Omit<User, 'password'> & {
    permissions: string[];
  }
>;
export type SelectUserById = Prettify<
  Omit<User, 'password'> & {
    permissions: string[];
  }
>;

/**
 * Product types
 */
export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export type SelectProducts = Prettify<
  Product & {
    product_image: string;
  }
>;

export type SelectProductById = Prettify<
  Product & {
    product_image: string;
    images: string[];
  }
>;

/**
 * Image types
 */
export type Image = {
  id: string;
  url: string;
};
