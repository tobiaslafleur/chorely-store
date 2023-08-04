export const insertImage = /*sql*/ `
  INSERT INTO images(url)
  VALUES($1)
  RETURNING id, url
`.replace(/\n/g, ' ');
