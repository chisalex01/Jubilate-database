import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function BookList() {
  const history = useHistory();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  const sortedBooks = books.sort((a, b) =>
    a.bookTitle.localeCompare(b.bookTitle)
  );

  const deleteOnClick = (event, id) => {
    event.preventDefault();
    axios.delete(`http://localhost:8000/books/${id}`).then(() => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    });
  };

  const goTo = (event, id) => {
    event.preventDefault();
    history.push(`/editBook/${id}`);
  };

  return (
    <div className="song-list">
      {sortedBooks.map((book) => (
        <Link key={book.id} to={`/bookDetails/${book.id}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="song-preview"
          >
            <h2>{book.bookTitle}</h2>

            <div>
              <button
                style={{ marginRight: "10px" }}
                className="btn"
                onClick={(event) => goTo(event, book.id)}
              >
                Editați
              </button>
              <button
                className="btn"
                onClick={(event) => deleteOnClick(event, book.id)}
              >
                Ștergeți
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BookList;
