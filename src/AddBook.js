import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddSong = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/books/", {
        bookTitle: bookTitle,
      })
      .then((response) => {
        console.log(response.status);
        history.push("/addData");
      });
  };

  return (
    <div className="create">
      <h2>Adaugă culegere nouă</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlul Culegerii:</label>
        <input
          type="text"
          required
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>În curs de autentificare...</button>}
      </form>
    </div>
  );
};

export default AddSong;
