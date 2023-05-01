import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const [isPending] = useState(false);
  const history = useHistory();
  const [song, setSong] = useState({
    titleRo: "",
    titleOriginal: "",
    book: "",
    year: "",
    number: "",
    publisher: "",
    contract: "",
  });
  const { titleRo, titleOriginal, book, year, number, publisher, contract } =
    song;
  var currentYear = new Date().getFullYear();
  const { id } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    var options = [];
    axios
      .get("http://localhost:8000/books")
      .then((e) => {
        for (let i = 0; i < e.data.length; i++) {
          options.push({
            value: e.data[i].bookTitle,
            text: e.data[i].bookTitle,
          });
          setBooks(options);
        }
      })
      .catch((e) => {
        console.log(e);
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
              {e.text}
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
          value={publisher}
          placeholder="Deținător drepturi"
          name="publisher"
          onChange={(e) => onInputChange(e)}
        />
        <label>Tip nou contract:</label>
        <select
          name="contract"
          value={contract}
          onChange={(e) => onInputChange(e)}
        >
          <option value="Contract de cesiune">Contract de cesiune</option>
          <option value="Contract de editare">Contract de editare</option>
          <option value="Plată în străinătate">Plată în străinătate</option>
        </select>
        {!isPending && <button>Modifică</button>}
        {isPending && <button disabled>Modificare...</button>}
      </form>
    </div>
  );
};

export default Edit;
