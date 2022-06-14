const pool = require('../utils/pool');
const Author = require('../models/Author');

class Book {
  id;
  title;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.authors = 
      row.authors.length > 0 ? row.authors.map((author) => new Author(author)) : [];
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
        LEFT JOIN authors on books.id = authors.id
        GROUP BY books.id`,
      [id]);
    return rows.map((row) => new Book(row));
  }
  static async insert({ title, year }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, year) VALUES ($1, $2) RETURNING *',
      [title, year]);
    return new Book(rows[0]);
  }
}

module.exports = Book;
