const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingBooks = await Book.getById(id);
    res.json(matchingBooks);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })

  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  });
