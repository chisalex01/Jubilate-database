import { Link, useParams } from "react-router-dom";

function CopyrightList({ copyright }) {
  const sortedData = copyright.sort((a, b) => {
    if (a !== b) {
      return a.name.localeCompare(b.name);
    }
  });
  const { id } = useParams();

  if (sortedData.length === 0) {
    return (
      <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
        Încă nu ați adăugat drepturi de autor 😔
      </p>
    );
  }

  return (
    <div className="song-list">
      {sortedData.map((copyright) => {
        return (
          <Link
            key={copyright.id}
            to={`/copyrightDetails/${id}/${copyright.id}`}
          >
            <div className="song-preview">
              <h2>{copyright.name}</h2>
              <h2>{copyright.role}</h2>
              <h2>{copyright.date}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default CopyrightList;
