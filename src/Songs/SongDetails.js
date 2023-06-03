import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import axios from "axios";

const DeleteConfirmation = ({ onDelete, onCancel }) => (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-content">
        <p>Sigur doriți să ștergeți cântarea?</p>
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

const SongDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: song, isPending } = useFetch(
    `http://localhost:8000/songs/${id}`
  );

  const deleteOnClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8000/songs/${id}`).then((response) => {
      console.log(response.status);
      history.push("/songs");
    });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const goTo = (link) => {
    history.push(link);
  };

  return (
    <div className="details">
      {isPending && <div>Conținutul paginii se încarcă...</div>}

      {song && (
        <div style={{ position: "relative" }} className="songData">
          <div className="title"></div>
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  Datele cântării
                </td>
              </tr>
              <tr>
                <td>Titlul tradus în limba română:</td>
                <td>{song.titleRo}</td>
              </tr>
              <tr>
                <td>Titlul original:</td>
                <td>{song.titleOriginal}</td>
              </tr>
              <tr>
                <td>Culegerea:</td>
                <td>{song.book}</td>
              </tr>
              <tr>
                <td>Anul publicării:</td>
                <td>{song.year}</td>
              </tr>
              <tr>
                <td>Numărul cântării:</td>
                <td>{song.number}</td>
              </tr>
              <tr>
                <td>Adminul drepturilor de autor:</td>
                <td>{song.admin}</td>
              </tr>
              <tr>
                <td>Date contact admin:</td>
                <td>{song.adminContact}</td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button className="button" onClick={() => goTo(`/copyright/${id}`)}>
              Drepturi de autor
            </button>
            <button className="button" onClick={() => goTo(`/editSong/${id}`)}>
              Editați
            </button>
            <button className="button" onClick={deleteOnClick}>
              Ștergeți
            </button>
            <button className="button" onClick={() => goTo("/songs")}>
              Înapoi
            </button>
          </div>
          {showConfirmation && (
            <DeleteConfirmation
              onDelete={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SongDetails;
