import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import CopyrightList from "./CopyrightList";

const Copyright = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data: song, isPending } = useFetch(
    `http://localhost:8000/songs/${id}`
  );

  const goTo = (link) => {
    history.push(link);
  };

  return (
    <div className="content home">
      <h1>Drepturile de autor ale cântării {song && song.titleRo}</h1>
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {song && (
        <div>
          <div className="addButton">
            <button
              style={{ width: "20%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo(`/songDetails/${id}`)}
            >
              Înapoi
            </button>
            <button
              style={{ width: "75%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo(`/addCopyright/${id}`)}
            >
              Adaugă drepturi de autor
            </button>
          </div>
          {song.copyright && <CopyrightList copyright={song.copyright} />}
        </div>
      )}
    </div>
  );
};

export default Copyright;
