import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddCopyright = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setImage(base64Data);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await axios.get(`http://localhost:8000/songs/${id}`);
      const song = response.data;

      const newObject = {
        id: Date.now(),
        name: name,
        role: role,
        notes: notes,
        image: image,
      };

      let updatedList;
      if (Array.isArray(song?.copyright)) {
        updatedList = [...song?.copyright, newObject];
      } else {
        updatedList = [newObject];
      }

      const updatedSong = {
        ...song,
        copyright: updatedList,
      };

      await axios.put(`http://localhost:8000/songs/${id}`, updatedSong);

      setIsPending(false);
      history.goBack();
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Adăugare drepturi autor</h2>
      <form onSubmit={handleSubmit}>
        <label>Numele adminului:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Rolul adminului</label>
        <select required value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            Selectați un rol
          </option>
          <option value="Compozitor">Compozitor</option>
          <option value="Textier">Textier</option>
          <option value="Aranjor">Aranjor</option>
          <option value="Adaptor text">Adaptor text</option>
          <option value="Admin copyright">Admin drepturi de autor</option>
        </select>
        <label>Corespondență:</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <label>Încărcați imagine</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

export default AddCopyright;
