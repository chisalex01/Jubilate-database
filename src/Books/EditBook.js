import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditBook = () => {
  const [isPending] = useState(false);
  const history = useHistory();
  const [book, setBook] = useState({
    bookTitle: "",
  });
  const { bookTitle } = book;
  const { id } = useParams();

  const goBack = () => {
    history.push(`/books`);
  };

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8000/books/${id}`);
    setBook(result.data);
  };

  useEffect(() => {
    loadBook();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/books/${id}`, book)
      .then((response) => {
        console.log(response.status);
        history.goBack();
      });
  };

  return (
    <div className="create">
      <h2>Editare Culegere</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlu nou:</label>
        <input
          type="text"
          required
          value={bookTitle}
          name="bookTitle"
          onChange={(e) => onInputChange(e)}
        />
        <div>
          {!isPending && <button>Modificați</button>}
          {isPending && <button disabled>Modificare...</button>}
          <button onClick={goBack} style={{ marginLeft: "10px" }}>
            Înapoi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
