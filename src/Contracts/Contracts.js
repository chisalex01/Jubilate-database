import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import ContractList from "./ContractList";

const Contracts = () => {
  const history = useHistory();
  const { id } = useParams();
  const { ID } = useParams();
  const { data: song, isPending } = useFetch(
    `http://localhost:8000/songs/${id}`
  );

  const goTo = (link) => {
    history.push(link);
  };

  return (
    <div className="content home">
      <h1>Contracte</h1>
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {song && (
        <div>
          <div className="addButton">
            <button
              style={{ width: "20%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo(`/copyrightDetails/${id}/${ID}`)}
            >
              Înapoi
            </button>
            <button
              style={{ width: "75%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo(`/addContract/${id}/${ID}`)}
            >
              Adaugă contract
            </button>
          </div>
          {song.copyright && (
            <ContractList copyright={song.copyright} ID={ID} />
          )}
        </div>
      )}
    </div>
  );
};

export default Contracts;
