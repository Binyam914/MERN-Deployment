import { useContext } from "react";
import { Link } from "react-router-dom";
import { HeaderContext } from "../App";

function Header() {
  const { info } = useContext(HeaderContext);

  return (
    <div className="navbar">
      <div className="catalogContainer">
        <div>
          <Link to="/" className="btn btn-catalog">
            Catalog
          </Link>
        </div>
        <div>
          <Link to="/book/create" className="btn btn-add-book">
            Add Book
          </Link>
        </div>
      </div>
      <h1 className="info">{info}</h1>
    </div>
  );
}

export default Header;
