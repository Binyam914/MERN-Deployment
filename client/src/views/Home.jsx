import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HeaderContext } from "../App";
import { getAllBooks } from "../services/book.services";

function Home() {
  const { setInfo } = useContext(HeaderContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setInfo("Book Catalog");
        setBooks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setInfo]);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
              <td>{book.isAvailable ? "Yes" : "No"}</td>
              <td>
                <Link to={`/book/${book._id}/update`} className="btn">
                  Edit
                </Link>{" "}
                |{" "}
                <Link to={`/book/${book._id}/details`} className="btn">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
