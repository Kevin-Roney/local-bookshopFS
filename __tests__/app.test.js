const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /books should return a list of books rendering id, title and release year', () => {
    const res = request(app).get('/books');
    const books = Book.getAll();
    expect(res.body).toEqual(books);
  });
  it('Get /authors should return a list of authors rendering id, name and books', () => {
    const res = request(app).get('/authors');
    const authors = Book.getAll();
    expect(res.body).toEqual(authors);
  });
  afterAll(() => {
    pool.end();
  });
});
