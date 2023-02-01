import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const song = { title, body, userId };

    setIsPending(true);

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      })
      .then((response) => {
        setIsPending(false);
        // history.go(-1);
        console.log(response.status);
        history.push("/");
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
        <label>Conținut:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <label>Autor:</label>
        <select value={userId} onChange={(e) => setAuthor(e.target.value)}>
          <option value="1">mario</option>
          <option value="2">yoshi</option>
          <option value="3">luigi</option>
          <option value="4">waluigi</option>
          <option value="5">princess peach</option>
          <option value="6">bowser</option>
          <option value="7">toad</option>
          <option value="8">wario</option>
          <option value="9">princess daisy</option>
          <option value="10">boo</option>
        </select>
        {!isPending && <button>Adaugă</button>}
        {isPending && <button disabled>Adăugare cântare...</button>}
      </form>
    </div>
  );
};

export default Create;
