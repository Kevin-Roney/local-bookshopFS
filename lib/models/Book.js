const pool = require('../utils/pool');
// const Author = require('../models/Author');

class Book {
  id;
  title;
  release;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.authors = row.authors && row.authors;
    // row.authors.length > 0 ? row.authors.map((author) => new Author(author)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
      books.*,
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
        ) AS authors from books
        LEFT JOIN books_authors on books.id = books_authors.book_id
        LEFT JOIN authors on books_authors.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]);
    return new Book(rows[0]);
  }
  static async insert({ title, release }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, release) VALUES ($1, $2) RETURNING *',
      [title, release]);
    return new Book(rows[0]);
  }
}

module.exports = Book;
