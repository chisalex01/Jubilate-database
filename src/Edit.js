import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const [isPending] = useState(false);
  const history = useHistory();
  const [song, setSong] = useState({ title: "", author: "", body: "" });
  const { title, author, body } = song;
  const { id } = useParams();
  const [setTitle] = useState("");
  const [setBody] = useState("");
  const [setAuthor] = useState("");

  const onInputChange = (e) => {
    setSong({ ...song, [e.target.author]: e.target.value });
  };

  const loadSong = async () => {
    const result = await axios.get("http://localhost:8000/songs/" + id);
    setSong(result.data);
  };

  useEffect(() => {
    loadSong();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/songs/" + id, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
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
      <h2>Editare cântare</h2>
      <form onSubmit={handleSubmit}>
        <label>Titlu nou:</label>
        <input
          type="text"
          required
          value={title}
          placeholder="N"
          onChange={(e) => onInputChange(e)}
        />
        <label>Autor nou:</label>
        <input
          value={author}
          type="text"
          onChange={(e) => onInputChange(e)}
          required
        ></input>
        <label>Conținut nou:</label>
        <textarea
          value={body}
          type="text"
          onChange={(e) => onInputChange(e)}
          required
        />
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>Adăugare...</button>}
      </form>
    </div>
  );
};

export default Edit;
