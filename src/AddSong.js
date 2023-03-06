import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddSong = () => {
  const [titleRo, setTitleRo] = useState("");
  const [titleOriginal, setTitleOriginal] = useState("");
  // const [author, setAuthor] = useState("");
  const [book, setBook] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState("");
  const [bookOriginal, setBookOriginal] = useState("");
  const [publisher, setPublisher] = useState("");
  var currentYear = new Date().getFullYear();
  // const [body, setBody] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();
  var books = new Array();
  axios.get("http://localhost:8000/books").then((e) => {
    for (let i = 0; i < e.data.length; i++) books.push(e.data[i].bookTitle);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/songs/", {
        titleRo: titleRo,
        titleOriginal: titleOriginal,
        book: book,
        year: year,
        page: page,
        bookOriginal: bookOriginal,
        publisher: publisher,
        // body: body,
        // author: author,
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
          {books.map((e) => console.log(e))}
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
        <label>Pagina în cartea Jubilate:</label>
        <input
          type="number"
          value={page}
          min="1"
          max="999"
          required
          onChange={(e) => setPage(e.target.value)}
        ></input>
        <label>Culegerea originală:</label>
        <input
          type="text"
          value={bookOriginal}
          required
          onChange={(e) => setBookOriginal(e.target.value)}
        ></input>
        <label>Editura:</label>
        <input
          type="text"
          value={publisher}
          required
          onChange={(e) => setPublisher(e.target.value)}
        ></input>
        {/* <label>Autor:</label>
        <input
          type="text"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        ></input> */}
        {/* <label>Conținut:</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        /> */}
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>În curs de autentificare...</button>}
      </form>
    </div>
  );
};

export default AddSong;
