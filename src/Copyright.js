import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import CopyrightList from "./CopyrightList";

const Copyright = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data: song, isPending } = useFetch(
    `http://localhost:8000/songs/${id}`
  );

  const goToAdd = () => {
    history.push(`/addCopyright/${id}`);
  };

  return (
    <div className="content home">
      <h1>Drepturi de autor</h1>
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {song && (
        <div>
          <div className="addButton">
            <button
              style={{ width: "100%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={goToAdd}
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
