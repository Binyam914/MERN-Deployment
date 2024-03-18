import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import BookDetails from "./views/bookDetails.jsx";
import BookForm from "./views/bookFrom.jsx";
import UpdateBook from "./views/updateBook.jsx";
import Header from "./components/Header.jsx";
import "./App.css";
const HeaderContext = createContext();
export { HeaderContext };

function App() {
  const [info, setInfo] = useState("Book Catalog");
  return (
    <>
      <div className="">
        <HeaderContext.Provider
          value={{
            info,
            setInfo,
          }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/Create" element={<BookForm />} />
              <Route path="book/:id/update" element={<UpdateBook />} />
              <Route path="book/:id/details" element={<BookDetails />} />
            </Routes>
          </BrowserRouter>
        </HeaderContext.Provider>
      </div>
    </>
  );
}

export default App;
