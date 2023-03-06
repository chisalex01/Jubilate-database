import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";

const SongDetails = () => {
  const { id } = useParams();
  const {
    data: song,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/songs/${id}`);

  const history = useHistory();

  const deleteOnClick = () => {
    axios.delete(`http://localhost:8000/songs/${id}`).then((response) => {
      console.log(response.status);
      history.push("/home");
    });
  };

  const goToEdit = () => {
    history.push("/editSong/" + song.id);
  };

  return (
    <div className="details">
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {error && <div>{error}</div>}
      {song && (
        <div className="songData">
          <div className="title">
            <h2>{song.titleRo}</h2>
          </div>
          <table>
            <tr>
              <td>Titlul tradus în limba română</td>
              <td>{song.titleRo}</td>
            </tr>
            <tr>
              <td>Titlul original</td>
              <td>{song.titleOriginal}</td>
            </tr>
            <tr>
              <td>Culegerea</td>
              <td>{song.book}</td>
            </tr>
            <tr>
              <td>Anul publicării</td>
              <td>{song.year}</td>
            </tr>
            <tr>
              <td>Pagina</td>
              <td>{song.page}</td>
            </tr>
            <tr>
              <td>Culegerea originală</td>
              <td> {song.bookOriginal}</td>
            </tr>
            <tr>
              <td>Editura </td>
              <td>{song.publisher}</td>
            </tr>
          </table>
          {/* <p>Compusă de {song.author}</p> */}
          {/* <div>{song.body}</div> */}{" "}
          <div className="buttons">
            <button className="button" onClick={goToEdit}>
              Editează
            </button>
            <button className="button" onClick={deleteOnClick}>
              Șterge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetails;
