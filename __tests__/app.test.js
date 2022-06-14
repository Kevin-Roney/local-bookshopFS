const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /books should return a list of books rendering id, title and release year', async () => {
    const resp = await request(app).get('/books');
    expect(resp.status).toBe(200);
    expect(resp.body[0].id).toBe('1');
    // expect(resp.body.length).toEqual(8);
  });
  it('Get /authors should return a list of authors rendering id, name and books', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.status).toBe(200);
    expect(resp.body[0].id).toBe('1');
  });
  it('Get /authors/:id should return a list of authors rendering id, name and books', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.status).toBe(200);
    expect(resp.body.id).toBe('1');
    expect(resp.body.name).toEqual('J.R.R. Tolkien');
  });
  it('Get /books/:id should return a list of authors rendering id, name and books', async () => {
    const resp = await request(app).get('/books/1');
    expect(resp.status).toBe(200);
    expect(resp.body.id).toBe('1');
    expect(resp.body.title).toEqual('The Lord of the Rings');
  });
  it('POST /books should insert new book', async () => {
    const resp = await request(app)
      .post('/books')
      .send({
        title: 'American Gods',
        release: 2001
      });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toEqual('American Gods');
  });
  it('POST /authors should insert new author', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({
        name: 'Neil Gaiman',
        dob: '1960-11-10',
        pob: 'Hampshire, England'
      });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toEqual('Neil Gaiman');
  });
  afterAll(() => {
    pool.end();
  });
});
