import BookList from "./BookList";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Books = () => {
  const { data: books, isPending } = useFetch("http://localhost:8000/books/");
  const history = useHistory();
  const goToLink = (link) => {
    history.push(link);
  };

  return (
    <div className="content home">
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      <h1>Culegeri de cântări</h1>
      <div className="addButton">
        <button
          style={{ width: "100%", height: "20%", marginTop: "20px" }}
          className="button"
          onClick={() => goToLink("/addBook")}
        >
          Adăugați o culegere nouă
        </button>
      </div>
      {books && <BookList books={books} />}
    </div>
  );
};
export default Books;
