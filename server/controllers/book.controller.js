import Book from "../models/book.model.js";

async function createBook(req, res, next) {
  try {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getAllBooks(req, res, next) {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getOneBook(req, res, next) {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.json(foundBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateOneBook(req, res, next) {
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteOneBook(req, res, next) {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { createBook, getAllBooks, getOneBook, updateOneBook, deleteOneBook };
