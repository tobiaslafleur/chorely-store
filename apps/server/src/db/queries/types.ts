export type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
};

export type InsertUser = Omit<User, 'password'>;
export type SelectMultipleUsers = Omit<User, 'password'> & {
  permissions: string[];
};
export type SelectUserById = Omit<User, 'password'> & {
  permissions: string[];
};
