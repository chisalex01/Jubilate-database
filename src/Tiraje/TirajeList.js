import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteConfirmation = ({ onDelete, onCancel }) => (
  <div className="popup-overlay delete">
    <div className="popup">
      <div className="popup-content">
        <p>Sigur doriți să ștergeți acest tiraj?</p>
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

function TirajeList({ tiraje }) {
  const { id } = useParams();
  const [tirajeList, setTirajeList] = useState(
    tiraje.sort((a, b) => a.year.localeCompare(b.year))
  );
  const [bookTitle, setBookTitle] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTirajYear, setSelectedTirajYear] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((response) => {
      setBookTitle(response.data.bookTitle);
    });
  }, [id]);

  const deleteTiraj = (year) => {
    setSelectedTirajYear(year);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios
      .put(`http://localhost:8000/books/${id}`, {
        bookTitle: bookTitle,
        tiraje: tirajeList.filter((tiraj) => tiraj.year !== selectedTirajYear),
      })
      .then(() => {
        const updatedTirajeList = tirajeList.filter(
          (tiraj) => tiraj.year !== selectedTirajYear
        );
        setTirajeList(updatedTirajeList);
        setSelectedTirajYear(null);
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.log("Error updating tiraje list:", error);
      });
  };

  const cancelDelete = () => {
    setSelectedTirajYear(null);
    setShowConfirmation(false);
  };

  return (
    <div style={{ marginTop: "0px" }} className="song-list">
      {tirajeList.map((tiraj) => (
        <div
          style={{ width: "600px" }}
          className="song-preview"
          key={tiraj.year}
        >
          <h2>Anul: {tiraj.year}</h2>
          <h2>Mărimea: {tiraj.size}</h2>
          <button className="btn" onClick={() => deleteTiraj(tiraj.year)}>
            Șterge
          </button>
        </div>
      ))}
      {showConfirmation && (
        <DeleteConfirmation onDelete={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}

export default TirajeList;
