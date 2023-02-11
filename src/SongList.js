import { Link } from "react-router-dom";

const SongList = ({ songs, title }) => {
  return (
    <div className="song-list">
      <h2>{title}</h2>
      {songs.map((song) => (
        <div className="song-preview" key={song.id}>
          <Link to={`/songs/${song.id}`}>
            <h2>{song.title}</h2>
            <p>Compusă de {song.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SongList;
