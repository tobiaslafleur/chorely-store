export const insertUser = `
  INSERT INTO users(email, password, first_name, last_name)
  VALUES($1, $2, $3, $4)
  RETURNING id, email, first_name, last_name;
`.replace(/\n/g, ' ');
