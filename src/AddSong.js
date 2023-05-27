import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AddSong = () => {
  const [titleRo, setTitleRo] = useState("");
  const [titleOriginal, setTitleOriginal] = useState("");
  const [book, setBook] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [admin, setAdmin] = useState("");
  const [adminContact, setAdminContact] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();
  const [books, setBooks] = useState([]);

  const goBack = () => {
    history.push("/songs");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        const sortedBooks = response.data.sort((a, b) =>
          a.bookTitle.localeCompare(b.bookTitle)
        );
        setBooks(sortedBooks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book) {
      // Book is not selected, display an error message or handle it as needed
      console.log("Please select a book");
      return;
    }

    await axios
      .post("http://localhost:8000/songs/", {
        titleRo,
        titleOriginal,
        book,
        year,
        number,
        admin,
        adminContact,
      })
      .then((response) => {
        console.log(response.status);
        history.push("/songs");
      });
  };

  return (
    <div className="create">
      <h2>Adăugare cântare</h2>
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
        <select value={book} required onChange={(e) => setBook(e.target.value)}>
          <option value="" disabled>
            Selectați o culegere
          </option>
          {books.map((e) => (
            <option key={e.id} value={e.value}>
              {e.bookTitle}
            </option>
          ))}
        </select>
        <label>Anul publicării:</label>
        <input
          type="number"
          value={year}
          required
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Numărul cântării:</label>
        <input
          type="number"
          value={number}
          min="1"
          max="999"
          required
          onChange={(e) => setNumber(e.target.value)}
        />
        <label>Administratorul drepturilor de autor:</label>
        <input
          type="text"
          value={admin}
          required
          onChange={(e) => setAdmin(e.target.value)}
        />
        <label>Date de contact admin:</label>
        <input
          type="text"
          value={adminContact}
          required
          onChange={(e) => setAdminContact(e.target.value)}
        />
        {/* se mută la adăugare contract
        <label>Tip Contract:</label>
        <select value={contract} onChange={(e) => setContract(e.target.value)}>
          <option value="Contract de cesiune">Contract de cesiune</option>
          <option value="Contract de editare">Contract de editare</option>
          <option value="Plată în străinătate">Plată în străinătate</option>
        </select> */}
        <div>
          {!isPending && <button>Adaugă</button>}
          {isPending && <button disabled>În curs de autentificare...</button>}
          <button onClick={goBack} style={{ marginLeft: "10px" }}>
            Înapoi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSong;
