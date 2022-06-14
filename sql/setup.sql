-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;


CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  release INT NOT NULL
);

INSERT INTO books (
  title,
  release
)
VALUES 
  ('The Lord of the Rings', 1954),
  ('The Hobbit', 1937),
  ('Eragon', 2002),
  ('The Chronicals of Narnia', 1950),
  ('Dragons of Autumn Twilight', 1984),
  ('The Crystal Shard', 1988),
  ('The Eye of the World', 1990);

