import { Link } from "react-router-dom";

function SongList({ input, songs, criteria }) {
  var filter;
  const filteredData = songs.filter((e) => {
    if (input === "") {
      return e;
    } else if (criteria === "title") {
      return e.titleRo.toLowerCase().includes(input);
    } else if (criteria === "titleOriginal") {
      filter = "Titlu original: " + e.titleOriginal;
      return e.titleOriginal.toLowerCase().includes(input);
    } else if (criteria === "book") {
      filter = "Culegere: " + e.book;
      return e.book.toLowerCase().includes(input);
    } else if (criteria === "year") {
      filter = "Anul lansării: " + e.year;
      return e.year.toLowerCase().includes(input);
    } else if (criteria === "number") {
      filter = "Numărul cântării " + e.number;
      return e.page.toLowerCase().includes(input);
    } else if (criteria === "bookOriginal") {
      filter = "Culegere originală: " + e.bookOriginal;
      return e.bookOriginal.toLowerCase().includes(input);
    } else if (criteria === "publisher") {
      filter = "Editura: " + e.publisher;
      return e.publisher.toLowerCase().includes(input);
    }
  });
  console.log(filteredData);
  return (
    <div className="song-list">
      {filteredData.map((song) => (
        <div className="song-preview" key={song.id}>
          <Link to={`/song/${song.id}`}>
            <h2>{song.titleRo}</h2>
            <p>{filter}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SongList;
