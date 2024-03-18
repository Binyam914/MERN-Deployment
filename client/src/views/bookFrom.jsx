import { useState, useContext, useEffect } from "react";
import { HeaderContext } from "../App";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/book.services";

function BookForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [isAvailable, setAvailableStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const { setInfo } = useContext(HeaderContext);
  const [formErrors, setFormErrors] = useState({
    title: "Title is required!",
    author: "Author is required!",
    pages: "Pages must be greater than 1",
  });
  useEffect(() => {
    setInfo("Add a Book");
  }, [setInfo]);

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
  const submitHandler = (e) => {
    e.preventDefault();
    createBook({
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
        setErrors(err.response.data);
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler} className="form-container">
          {errors && (
            <p className="err">
              {errors.name} {errors.statusCode}
            </p>
          )}
          <div>
            <label>Title: </label>
            <input value={title} type="text" onChange={titleHandler} />
            {formErrors.title && (
              <p>
                <span className="err">Front End:</span>
                {formErrors.title}
              </p>
            )}
            {errors.validationErrors && (
              <p className="err">{errors.validationErrors.title}</p>
            )}
          </div>
          <div>
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
          <div>
            <label>Pages Count</label>
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
          <div>
            <label>is Available? </label>
            <input
              value={isAvailable}
              type="checkbox"
              onChange={isAvailableHandler}
            />
          </div>
          <button disabled={!validateForm()} type="submit" className="">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default BookForm;
