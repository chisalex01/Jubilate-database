import { Link } from "react-router-dom";

function SongList({ input, songs, criteria }) {
  const sortedData = songs.sort((a, b) => {
    if (a[criteria] !== b[criteria]) {
      return a[criteria].localeCompare(b[criteria]);
    } else {
      return a.titleRo.localeCompare(b.titleRo);
    }
  });

  const filteredData = sortedData.filter((e) => {
    if (input === "") {
      return true;
    } else if (criteria === "title") {
      return e.titleRo.toLowerCase().includes(input.toLowerCase());
    } else if (criteria === "titleOriginal") {
      return e.titleOriginal.toLowerCase().includes(input.toLowerCase());
    } else if (criteria === "book") {
      return e.book.toLowerCase().includes(input.toLowerCase());
    } else if (criteria === "year") {
      return e.year.toLowerCase().includes(input.toLowerCase());
    } else if (criteria === "number") {
      return e.page.toLowerCase().includes(input.toLowerCase());
    } else if (criteria === "admin") {
      return e.admin.toLowerCase().includes(input.toLowerCase());
    }
    return false;
  });

  if (filteredData.length === 0) {
    return (
      <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
        Nicio cântare nu întâlnește criteriul filtrului 😔
      </p>
    );
  }

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
          case "admin":
            filter = "Adminul: " + song.admin;
            break;
          default:
            break;
        }

        return (
          <Link key={song.id} to={`/songDetails/${song.id}`}>
            <div className="song-preview">
              <h2>{song.titleRo}</h2>
              {input !== "" && <p>{filter}</p>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SongList;
