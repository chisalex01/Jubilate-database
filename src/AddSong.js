import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddSong = () => {
  const [titleRo, setTitleRo] = useState("");
  const [titleOriginal, setTitleOriginal] = useState("");
  const [book, setBook] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [publisher, setPublisher] = useState("");
  const [contract, setContract] = useState("");
  var currentYear = new Date().getFullYear();
  const [isPending] = useState(false);
  const history = useHistory();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/songs/", {
        titleRo: titleRo,
        titleOriginal: titleOriginal,
        book: book,
        year: year,
        number: number,
        publisher: publisher,
        contract: contract,
      })
      .then((response) => {
        console.log(response.status);
        history.push("/addData");
      });
  };

  return (
    <div className="create">
      <h2>Adaugă cântare nouă</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlul tradus:</label>
        <input
          type="text"
          required
          value={titleRo}
          onChange={(e) => setTitleRo(e.target.value)}
        />
        <label>Titlul original:</label>
        <input
          type="text"
          required
          value={titleOriginal}
          onChange={(e) => setTitleOriginal(e.target.value)}
        />
        <label>Culegerea Jubilate:</label>
        <select
          type="text"
          value={book}
          required
          onChange={(e) => setBook(e.target.value)}
        >
          {books.map((e) => (
            <option key={e.value} value={e.value}>
              {e.text}
            </option>
          ))}
        </select>
        <label>Anul publicării:</label>
        <input
          type="number"
          value={year}
          required
          min="1900"
          max={currentYear}
          onChange={(e) => setYear(e.target.value)}
        ></input>
        <label>Numărul cântării:</label>
        <input
          type="number"
          value={number}
          min="1"
          max="999"
          required
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <label>Deținătorul drepturilor:</label>
        <input
          type="text"
          value={publisher}
          required
          onChange={(e) => setPublisher(e.target.value)}
        ></input>
        <label>Tip Contract:</label>
        <select value={contract} onChange={(e) => setContract(e.target.value)}>
          <option value="Contract de cesiune">Contract de cesiune</option>
          <option value="Contract de editare">Contract de editare</option>
          <option value="Plată în străinătate">Plată în străinătate</option>
        </select>
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>În curs de autentificare...</button>}
      </form>
    </div>
  );
};

export default AddSong;
