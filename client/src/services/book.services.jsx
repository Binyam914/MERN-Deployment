import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:9999/api",
});

function getAllBooks() {
  return http
    .get("/books")
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}
function getOneBook(id) {
  return http
    .get(`/books/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}
function updateBook(book) {
  return http
    .put(`/books/${book._id}`, book)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
function createBook(book) {
  return http
    .post("/books/", book)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
function deleteBook(id) {
  return http
    .delete(`/books/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export { getAllBooks, getOneBook, updateBook, deleteBook, createBook };
