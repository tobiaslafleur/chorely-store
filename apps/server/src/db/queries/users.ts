export const insertUser = /*sql*/ `
  INSERT INTO users(email, password, first_name, last_name)
  VALUES($1, $2, $3, $4)
  RETURNING id, email, first_name, last_name, created_at, updated_at
`.replace(/\n/g, ' ');

export const selectMultipleUsers = /*sql*/ `
  SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.created_at,
    u.updated_at,
    CASE WHEN COUNT(up.user_id) > 0 THEN ARRAY_AGG(p.permission) ELSE ARRAY[]::VARCHAR[] END AS permissions
  FROM users u
  LEFT JOIN user_permissions up ON up.user_id = u.id
  LEFT JOIN permissions p ON p.id = up.permission_id
  GROUP BY u.id, u.email, u.first_name, u.last_name, u.created_at, u.updated_at
`.replace(/\n/g, ' ');

export const selectUserById = /*sql*/ `
  SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.created_at,
    u.updated_at,
    CASE WHEN COUNT(up.user_id) > 0 THEN ARRAY_AGG(p.permission) ELSE ARRAY[]::VARCHAR[] END AS permissions
  FROM users u
  LEFT JOIN user_permissions up ON up.user_id = u.id
  LEFT JOIN permissions p ON p.id = up.permission_id
  WHERE u.id = $1
  GROUP BY u.id, u.email, u.first_name, u.last_name, u.created_at, u.updated_at
`.replace(/\n/g, ' ');

export const selectUserByEmailWithPassword = /*sql*/ `
  SELECT 
    u.id,
    u.email,
    u.password,
    u.first_name,
    u.last_name,
    u.created_at,
    u.updated_at,
    CASE WHEN COUNT(up.user_id) > 0 THEN ARRAY_AGG(p.permission) ELSE ARRAY[]::VARCHAR[] END AS permissions
  FROM users u
  LEFT JOIN user_permissions up ON up.user_id = u.id
  LEFT JOIN permissions p ON p.id = up.permission_id
  WHERE u.email = $1
  GROUP BY u.id, u.email, u.password, u.first_name, u.last_name, u.created_at, u.updated_at
`.replace(/\n/g, ' ');
