-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books_authors;

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

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE NOT NULL,
  pob VARCHAR NOT NULL
);
INSERT INTO authors (
  name,
  dob,
  pob
)
VALUES
  ('J.R.R. Tolkien', '1892-01-03', 'Bloemfontein, South Africa'),
  ('Christopher Paolini', '1982-11-17', 'Los Angeles, California'),
  ('C.S. Lewis', '1898-11-29', 'Belfast, Northern Ireland'),
  ('Margaret Weis', '1948-3-16', 'Independence, Missouri'),
  ('Tracy Hickman', '1955-11-26', 'Salt Lake City, Utah'),
  ('R.A. Salvatore', '1959-1-20', 'Leominster, Massachusetts'),
  ('Robert Jordan', '1948-10-17', 'Charleston, South Carolina');

CREATE TABLE books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
INSERT INTO books_authors (
  book_id,
  author_id
)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 3),
  (5, 4),
  (5, 5),
  (6, 6),
  (7, 7);
