import SongList from "./SongList";
import useFetch from "../useFetch";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Songs = () => {
  const [inputText, setInputText] = useState("");
  const [criteria, setCriteria] = useState("title");
  const history = useHistory();
  let inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  const { data: songs, isPending } = useFetch("http://localhost:8000/songs/");

  const goTo = (link) => {
    history.push(link);
  };

  const handleChange = (e) => {
    setCriteria(e.target.value);
  };

  return (
    <div className="content home">
      <h1 style={{ marginTop: "0px" }}>Cântări</h1>
      <div className="searchbar">
        <p>Filtrați după:</p>
        <select value={criteria} onChange={handleChange}>
          <option value="title">titlu</option>
          <option value="titleOriginal">titlu original</option>
          <option value="book">culegere</option>
          <option value="year">anul lansării</option>
          <option value="number">numărul cântării</option>
          <option value="admin">admin</option>
        </select>
        <input
          className="search"
          onChange={inputHandler}
          placeholder="Căutați o cântare"
        />
      </div>
      <div className="addButton">
        <button
          style={{ width: "100%", height: "20%" }}
          className="button"
          onClick={() => goTo("/addSong")}
        >
          Adăugați o cântare nouă
        </button>
      </div>
      {isPending && <div>Se încarcă cântările...</div>}
      {songs && songs.length > 0 ? (
        <SongList criteria={criteria} input={inputText} songs={songs} />
      ) : (
        songs !== null && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Lista de cântări este goală 😔
          </p>
        )
      )}
    </div>
  );
};

export default Songs;
