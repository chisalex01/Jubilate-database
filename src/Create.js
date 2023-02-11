import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/songs/", {
        title: title,
        body: body,
        author: author,
      })
      .then((response) => {
        console.log(response.status);
        history.push("/home");
      });
  };

  return (
    <div className="create">
      <h2>Adaugă cântare nouă</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlu:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Autor:</label>
        <input
          type="text"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label>Conținut:</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>În curs de autentificare...</button>}
      </form>
    </div>
  );
};

export default Create;
