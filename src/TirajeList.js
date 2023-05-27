import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function TirajeList({ tiraje }) {
  const { id } = useParams();
  const [tirajeList, setTirajeList] = useState(
    tiraje.sort((a, b) => a.year.localeCompare(b.year))
  );
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((response) => {
      setBookTitle(response.data.bookTitle);
    });
  });

  const deleteTiraj = (year) => {
    axios
      .put(`http://localhost:8000/books/${id}`, {
        bookTitle: bookTitle,
        tiraje: tirajeList.filter((tiraj) => tiraj.year !== year),
      })
      .then(() => {
        const updatedTirajeList = tirajeList.filter(
          (tiraj) => tiraj.year !== year
        );
        setTirajeList(updatedTirajeList);
      })
      .catch((error) => {
        console.log("Error updating tiraje list:", error);
      });
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
    </div>
  );
}

export default TirajeList;
