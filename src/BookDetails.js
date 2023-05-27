import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import TirajeList from "./TirajeList";

const BookDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data: book, isPending } = useFetch(
    `http://localhost:8000/books/${id}`
  );

  const goToAddTiraj = () => {
    history.push(`/addTiraj/${id}`);
  };

  return (
    <div className="content home">
      <h1>Tiraje</h1>
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {book && (
        <div>
          <div className="addButton">
            <button
              style={{ width: "100%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={goToAddTiraj}
            >
              Adăugați un tiraj nou
            </button>
          </div>
          {book.tiraje && <TirajeList tiraje={book.tiraje} />}
        </div>
      )}
    </div>
  );
};

export default BookDetails;
