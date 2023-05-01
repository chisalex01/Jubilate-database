import { Link } from "react-router-dom";

function SongList({ input, songs, criteria }) {
  const filteredData = songs.filter((e) => {
    if (input === "") {
      return e;
    } else if (criteria === "title") {
      return e.titleRo.toLowerCase().includes(input);
    } else if (criteria === "titleOriginal") {
      return e.titleOriginal.toLowerCase().includes(input);
    } else if (criteria === "book") {
      return e.book.toLowerCase().includes(input);
    } else if (criteria === "year") {
      return e.year.toLowerCase().includes(input);
    } else if (criteria === "number") {
      return e.page.toLowerCase().includes(input);
    } else if (criteria === "publisher") {
      return e.publisher.toLowerCase().includes(input);
    }
  });

  console.log(filteredData);

  return (
    <div className="song-list">
      {filteredData.map((song) => {
        let filter = "";
        switch (criteria) {
          case "title":
            filter = "";
            break;
          case "titleOriginal":
            filter = "Titlu original: " + song.titleOriginal;
            break;
          case "book":
            filter = "Culegere: " + song.book;
            break;
          case "year":
            filter = "Anul lansării: " + song.year;
            break;
          case "number":
            filter = "Numărul cântării " + song.number;
            break;
          case "publisher":
            filter = "Editura: " + song.publisher;
            break;
          default:
            filter = "";
            break;
        }

        return (
          <div className="song-preview" key={song.id}>
            <Link to={`/song/${song.id}`}>
              <h2>{song.titleRo}</h2>
              <p>{filter}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SongList;
