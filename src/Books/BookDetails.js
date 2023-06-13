import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import TirajeList from "../Tiraje/TirajeList";

const BookDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data: book, isPending } = useFetch(
    `http://localhost:8000/books/${id}`
  );

  const goTo = (link) => {
    history.push(link);
  };

  return (
    <div className="content home">
      <h1>Tirajele culegerii {book && book.bookTitle}</h1>
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {book && (
        <div>
          <div className="addButton">
            <button
              style={{ width: "20%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo("/books")}
            >
              Înapoi
            </button>
            <button
              style={{ width: "75%", height: "20%", marginTop: "20px" }}
              className="button"
              onClick={() => goTo(`/addTiraj/${id}`)}
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
