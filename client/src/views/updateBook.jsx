import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderContext } from "../App";
import { getOneBook, updateBook } from "../services/book.services";
function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [isAvailable, setAvailableStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const { setInfo } = useContext(HeaderContext);
  const [formErrors, setFormErrors] = useState({
    title: "",
    author: "",
    pages: "",
  });

  useEffect(() => {
    getOneBook(id)
      .then((res) => {
        setInfo("Update " + res.title);
        setTitle(res.title);
        setAuthor(res.author);
        setPages(res.pages);
        setAvailableStatus(res.isAvailable);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const validateForm = () => {
    return Object.values(formErrors).every((value) => value === "");
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
    const value = e.target.value.trim();
    let errorMsg = "";
    if (value) {
      if (value.length < 2) {
        errorMsg = "Title must be at least 2 characters long!";
      } else if (value.length > 255) {
        errorMsg = "Title must be less than 255 characters long";
      }
    } else {
      errorMsg = "Title is required!";
    }
    setFormErrors({ ...formErrors, title: errorMsg });
  };
  const authorHandler = (e) => {
    setAuthor(e.target.value);
    const value = e.target.value.trim();
    let errorMsg = "";
    if (value) {
      if (value.length < 2) {
        errorMsg = "author must be at least 2 characters long!";
      } else if (value.length > 255) {
        errorMsg = "author must be less than 255 characters long";
      }
    } else {
      errorMsg = "author is required!";
    }
    setFormErrors({ ...formErrors, author: errorMsg });
  };
  const pagesHandler = (e) => {
    setPages(e.target.value);
    const value = e.target.value;
    let errorMsg = "";
    if (value) {
      if (value <= 0) {
        errorMsg = "Book must be at least 1 page long!";
      }
    } else {
      errorMsg = "Pages is required!";
    }
    setFormErrors({ ...formErrors, pages: errorMsg });
  };
  const isAvailableHandler = (e) => {
    setAvailableStatus(e.target.checked);
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    updateBook({
      _id: id,
      title,
      author,
      pages,
      isAvailable,
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log("eee:", err.response.data);
        setErrors(err.response.data);
      });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form-container">
        {errors && (
          <p className="err">
            {errors.name} {errors.statusCode}
          </p>
        )}
        <div className="form-group">
          <label>Title: </label>
          <input value={title} type="text" onChange={titleHandler} />
          {errors.validationErrors && (
            <p className="err">{errors.validationErrors.title}</p>
          )}
          {formErrors.title && (
            <p>
              <span className="err">Front End:</span>
              {formErrors.title}
            </p>
          )}
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input value={author} type="text" onChange={authorHandler} />
          {formErrors.author && (
            <p>
              <span className="err">Front End:</span>
              {formErrors.author}
            </p>
          )}
          {errors.validationErrors && (
            <p className="err">{errors.validationErrors.author}</p>
          )}
        </div>
        <div className="form-group">
          <label>Pages </label>
          <input value={pages} type="number" onChange={pagesHandler} />
          {formErrors.pages && (
            <p>
              <span className="err">Front End:</span>
              {formErrors.pages}
            </p>
          )}
          {errors.validationErrors && (
            <p className="err">{errors.validationErrors.pages}</p>
          )}
        </div>
        <div className="form-group">
          <label>is Available? </label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={isAvailableHandler}
          />
        </div>
        <button disabled={!validateForm()} type="submit" className="">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
