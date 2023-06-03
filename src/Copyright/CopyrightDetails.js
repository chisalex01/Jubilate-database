import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const DeleteConfirmation = ({ onDelete, onCancel }) => (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-content">
        <p>Sigur doriți să ștergeți aceste drepturi de autor?</p>
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

const CopyrightDetails = () => {
  const { id } = useParams();
  const { ID } = useParams();
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [copyright, setCopyright] = useState(null);

  const fetchCopyright = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/songs/${id}`);
      for (let i = 0; i < response.data.copyright.length; i++) {
        if (response.data.copyright[i].id == ID)
          setCopyright(response.data.copyright[i]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOnClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios
      .get(`http://localhost:8000/songs/${id}`)
      .then((response) => {
        const song = response.data;
        const updatedCopyright = song?.copyright.filter(
          (item) => item.id !== ID
        );

        const updatedSong = {
          ...song,
          copyright: updatedCopyright,
        };

        return axios.put(`http://localhost:8000/songs/${id}`, updatedSong);
      })
      .then(() => {
        console.log("Copyright deleted successfully.");
        history.push(`/copyright/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    console.log("Cancel Delete");
  };

  const goTo = (link) => {
    history.push(link);
  };

  useEffect(() => {
    fetchCopyright();
  }, [id]);

  return (
    <div className="details">
      {copyright && (
        <div style={{ position: "relative" }} className="songData">
          <div className="title"></div>
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  Datele drepturilor de autor
                </td>
              </tr>
              <tr>
                <td>Deținătorului drepturilor de autor:</td>
                <td>{copyright.name}</td>
              </tr>
              <tr>
                <td>Rolul deținătorului:</td>
                <td>{copyright.role}</td>
              </tr>
              <tr>
                <td>Notițe:</td>
                <td>{copyright.notes}</td>
              </tr>
              <tr>
                <td>Imagine:</td>
                <td>{copyright.image}</td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button
              className="button"
              onClick={() => goTo(`/contracts/${id}/${ID}`)}
            >
              Contracte
            </button>
            <button
              className="button"
              onClick={() => goTo(`/editCopyright/${id}/${ID}`)}
            >
              Editați
            </button>
            <button className="button" onClick={deleteOnClick}>
              Ștergeți
            </button>
            <button className="button" onClick={() => goTo(`/copyright/${id}`)}>
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

export default CopyrightDetails;
