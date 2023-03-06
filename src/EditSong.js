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
    page: "",
    bookOriginal: "",
    publisher: "",
  });
  const { titleRo, titleOriginal, book, year, page, bookOriginal, publisher } =
    song;
  var currentYear = new Date().getFullYear();
  const { id } = useParams();

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
        history.push("/home");
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
        <input
          type="text"
          required
          value={book}
          placeholder="Culegerea de care aparține"
          name="book"
          onChange={(e) => onInputChange(e)}
        />
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
        <label>Pagină nouă:</label>
        <input
          type="number"
          required
          min="1"
          max="999"
          value={page}
          placeholder="Pagina în culegerea Jubilate"
          name="page"
          onChange={(e) => onInputChange(e)}
        />
        <label>Culegere orginală nouă:</label>
        <input
          type="text"
          required
          value={bookOriginal}
          placeholder="Numele culegerii originale"
          name="bookOriginal"
          onChange={(e) => onInputChange(e)}
        />
        <label>Editură nouă:</label>
        <input
          type="text"
          required
          value={publisher}
          placeholder="Editura de care aparține"
          name="publisher"
          onChange={(e) => onInputChange(e)}
        />
        {/* <label>Autor nou:</label>
        <input
          value={author}
          type="text"
          onChange={(e) => onInputChange(e)}
          required
          placeholder="Autor"
          name="author"
        ></input>
        <label>Conținut nou:</label>
        <textarea
          value={body}
          type="text"
          onChange={(e) => onInputChange(e)}
          required
          name="body"
          placeholder="Conținut"
        /> */}
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>Adăugare...</button>}
      </form>
    </div>
  );
};

export default Edit;
