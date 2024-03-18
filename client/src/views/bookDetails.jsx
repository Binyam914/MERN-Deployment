import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderContext } from "../App";
import { deleteBook, getOneBook } from "../services/book.services";
function BookDetails() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { setInfo } = useContext(HeaderContext);

  useEffect(() => {
    getOneBook(id)
      .then((res) => {
        setBook(res);
        setInfo(res.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, setInfo]);

  const borrowBook = (id) => {
    deleteBook(id)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="details-container">
        <h1 className="details-title">Book Details</h1>
        <div className="details-item">
          <strong>Title:</strong> {book.title}
        </div>
        <div className="details-item">
          <strong>Author:</strong> {book.author}
        </div>
        <div className="details-item">
          <strong>Pages:</strong> {book.pages}
        </div>
        <div className="details-item">
          <strong>Availability:</strong>{" "}
          {book.isAvailable
            ? "book is available for borrowing"
            : "book is not available for borrowing"}
        </div>
        {book.isAvailable && (
          <button onClick={() => borrowBook(id)} className="btn">
            Borrow
          </button>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
