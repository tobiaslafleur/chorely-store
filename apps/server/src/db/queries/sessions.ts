export const insertSession = /*sql*/ `
  INSERT INTO sessions(user_id, agent)
  VALUES($1, $2)
  RETURNING id, user_id, agent
`;
