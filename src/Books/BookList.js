import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DeleteConfirmation = ({ onDelete, onCancel }) => (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-content">
        <p>Sigur doriți să ștergeți culegerea?</p>
        <div className="popup-buttons">
          <button className="button" onClick={onDelete}>
            Șterge
          </button>
          <button className="button" onClick={onCancel}>
            Anulează
          </button>
        </div>
      </div>
    </div>
  </div>
);

function BookList() {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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
    setSelectedBookId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8000/books/${selectedBookId}`).then(() => {
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectedBookId)
      );
      setSelectedBookId(null);
      setShowConfirmation(false);
    });
  };

  const cancelDelete = () => {
    setSelectedBookId(null);
    setShowConfirmation(false);
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
      {showConfirmation && (
        <DeleteConfirmation onDelete={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}

export default BookList;
