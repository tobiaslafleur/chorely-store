export const insertImage = `
  INSERT INTO images(url)
  VALUES($1)
  RETURNING id, url
`.replace(/\n/g, ' ');
