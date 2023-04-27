import { useHistory } from "react-router-dom";

const AddData = () => {
  const history = useHistory();

  const goToLink = (link) => {
    history.push(link);
  };

  return (
    <div className="addData">
      <h1>Adăugă tipul de date dorit</h1>
      <div className="addButton">
        <h3>Cântare:</h3>
        <button className="button" onClick={() => goToLink("/addSong")}>
          +
        </button>
      </div>
      <div className="addButton">
        <h3>Culegere:</h3>
        <button className="button" onClick={() => goToLink("/addBook")}>
          +
        </button>
      </div>
      <div className="addButton">
        <h3>Tiraj:</h3>
        <button className="button" onClick={() => goToLink("/addSong")}>
          +
        </button>
      </div>
      <div className="addButton">
        <h3>Drepturi de autor:</h3>
        <button className="button" onClick={() => goToLink("/addSong")}>
          +
        </button>
      </div>
      <div className="addButton">
        <h3>Deținător drepturi de autor:</h3>
        <button className="button" onClick={() => goToLink("/addSong")}>
          +
        </button>
      </div>
      <div className="addButton">
        <h3>Contract:</h3>
        <button className="button" onClick={() => goToLink("/addSong")}>
          +
        </button>
      </div>
    </div>
  );
};

export default AddData;
