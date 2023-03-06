import SongList from "./SongList";
import useFetch from "./useFetch";
import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [criteria, setCriterira] = useState("title");
  let inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  const {
    data: songs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/songs/");

  const handleChange = (e) => {
    setCriterira(e.target.value);
  };

  return (
    <div className="content home">
      {error && <div>{error}</div>}
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      <div className="searchbar">
        <p>Filtrează după:</p>
        <select value={criteria} onChange={handleChange}>
          <option value="title">titlu</option>
          <option value="titleOriginal">titlu original</option>
          <option value="book">culegere</option>
          <option value="year">anul lansării</option>
          <option value="page">pagină</option>
          <option value="bookOriginal">culegerea originală</option>
          <option value="publisher">editură</option>
        </select>
        <input
          className="search"
          onChange={inputHandler}
          placeholder="Caută cântare"
        />
      </div>
      {songs && (
        <SongList criteria={criteria} input={inputText} songs={songs} />
      )}
    </div>
  );
};
export default Home;
