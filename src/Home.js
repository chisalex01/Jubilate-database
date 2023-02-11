import SongList from "./SongList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: songs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/songs/");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Conținutul paginii se încarcă...</div>}
      {songs && <SongList songs={songs} title={"Toate cântările!"} />}
    </div>
  );
};
export default Home;
