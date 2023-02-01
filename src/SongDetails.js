import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";

const SongDetails = () => {
  const { id } = useParams();
  const {
    data: song,
    error,
    isPending,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/" + id);

  const history = useHistory();

  const deleteOnClick = () => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + song.id)
      .then((response) => {
        console.log(response.status);
        history.push("/");
      });
  };

  const goToEdit = () => {
    history.push("/edit/" + song.id);
  };

  return (
    <div className="song-details">
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {error && <div>{error}</div>}
      {song && (
        <article>
          <h2>{song.title}</h2>
          <p>Scrisă de {song.userId}</p>
          <div>{song.body}</div>
          <button onClick={goToEdit}>editează</button>
          <button onClick={deleteOnClick}>șterge</button>
        </article>
      )}
    </div>
  );
};

export default SongDetails;
