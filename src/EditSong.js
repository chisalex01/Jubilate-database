import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
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
        history.push(`/song/${id}`);
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
          placeholder="Titlul în limba română"
          name="titleRo"
          onChange={(e) => onInputChange(e)}
        />
        <label>Titlu original nou:</label>
        <input
          type="text"
          required
          value={titleOriginal}
          placeholder="Titlul original"
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
            <option key={e.value} value={e.value}>
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
          placeholder="Anul în care a fost lansată cântarea"
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
          placeholder="Numărul în culegerea Jubilate"
          name="number"
          onChange={(e) => onInputChange(e)}
        />
        <label>Deținător drepturi nou:</label>
        <input
          type="text"
          required
          value={admin}
          placeholder="Deținător drepturi"
          name="admin"
          onChange={(e) => onInputChange(e)}
        />
        <label>Date de contact noi:</label>
        <input
          type="text"
          required
          value={adminContact}
          placeholder="Datele de contact ale adminului"
          name="adminContact"
          onChange={(e) => onInputChange(e)}
        />
        {/* <label>Tip nou contract:</label>
        <select
          name="contract"
          value={contract}
          onChange={(e) => onInputChange(e)}
        >
          <option value="Contract de cesiune">Contract de cesiune</option>
          <option value="Contract de editare">Contract de editare</option>
          <option value="Plată în străinătate">Plată în străinătate</option>
        </select> */}
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

export default Edit;
