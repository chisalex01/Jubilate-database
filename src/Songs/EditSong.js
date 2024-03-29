import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditSong = () => {
  const [isPending] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  var currentYear = new Date().getFullYear();
  const [song, setSong] = useState({
    titleRo: "",
    titleOriginal: "",
    book: "",
    year: "",
    number: "",
    admin: "",
    adminContact: "",
  });
  const { titleRo, titleOriginal, book, year, number, admin, adminContact } =
    song;

  const goBack = () => {
    history.push(`/songDetails/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        const sortedOptions = response.data.sort((a, b) =>
          a.bookTitle.localeCompare(b.bookTitle)
        );
        setBooks(sortedOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onInputChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const loadSong = async () => {
    const result = await axios.get(`http://localhost:8000/songs/${id}`);
    setSong(result.data);
  };

  useEffect(() => {
    loadSong();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/songs/${id}`, song)
      .then((response) => {
        console.log(response.status);
        history.goBack();
      });
  };

  return (
    <div className="create">
      <h2>Editare cântare</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlu nou:</label>
        <input
          type="text"
          required
          value={titleRo}
          name="titleRo"
          onChange={(e) => onInputChange(e)}
        />
        <label>Titlu original nou:</label>
        <input
          type="text"
          required
          value={titleOriginal}
          name="titleOriginal"
          onChange={(e) => onInputChange(e)}
        />
        <label>Culegere nouă:</label>
        <select
          type="text"
          value={book}
          required
          name="book"
          onChange={(e) => onInputChange(e)}
        >
          {books.map((e) => (
            <option key={e.id} value={e.value}>
              {e.bookTitle}
            </option>
          ))}
        </select>
        <label>An nou:</label>
        <input
          type="number"
          required
          value={year}
          min="1900"
          max={currentYear}
          name="year"
          onChange={(e) => onInputChange(e)}
        />
        <label>Număr nou cântare:</label>
        <input
          type="number"
          required
          min="1"
          max="999"
          value={number}
          name="number"
          onChange={(e) => onInputChange(e)}
        />
        <label>Deținător drepturi nou:</label>
        <input
          type="text"
          required
          value={admin}
          name="admin"
          onChange={(e) => onInputChange(e)}
        />
        <label>Date de contact noi:</label>
        <input
          type="text"
          required
          value={adminContact}
          name="adminContact"
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

export default EditSong;
