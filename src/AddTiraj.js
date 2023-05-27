import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddTiraj = () => {
  const [size, setSize] = useState("");
  const [year, setYear] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isYearUsed, setIsYearUsed] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const goBack = () => {
    history.push(`/bookDetails/${id}`);
  };

  useEffect(() => {
    const checkYearUsage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        const tiraje = response.data.tiraje;
        if (Array.isArray(tiraje)) {
          const isUsed = tiraje.some((tiraj) => tiraj.year === year);
          setIsYearUsed(isUsed);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (year !== "") {
      checkYearUsage();
    }
  }, [year, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (year === "" || size === "" || isYearUsed) {
      return; // Prevent form submission if year or size is empty or year is already used
    }

    setIsPending(true);

    try {
      const response = await axios.get(`http://localhost:8000/books/${id}`);
      const tiraje = response.data.tiraje;
      const bookTitle = response.data.bookTitle;

      const newObject = { size: size, year: year };

      let updatedList;
      if (Array.isArray(tiraje)) {
        updatedList = [...tiraje, newObject];
      } else {
        updatedList = [newObject];
      }

      console.log("updatedList:", updatedList);

      const updatedBook = { bookTitle, tiraje: updatedList };

      console.log("updatedBook:", updatedBook);

      await axios.put(`http://localhost:8000/books/${id}`, updatedBook);

      setIsPending(false);
      history.goBack();
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Adăugare Tiraj</h2>
      <form onSubmit={handleSubmit}>
        <label>Dimensiune tiraj:</label>
        <input
          type="number"
          required
          min={1}
          max={999999}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <label>Anul tirajului:</label>
        <input
          type="number"
          required
          value={year}
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}
        />
        {isYearUsed && (
          <p>Anul a fost deja utilizat pentru un tiraj existent.</p>
        )}

        {isPending && <p>În curs de autentificare...</p>}
        <div>
          <button type="submit">Adaugă</button>
          <button onClick={goBack} style={{ marginLeft: "10px" }}>
            Înapoi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTiraj;
