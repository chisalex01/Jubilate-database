import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditCopyright = () => {
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [copyright, setCopyright] = useState({
    name: "",
    role: "",
    date: "",
    notes: "",
    image: "",
  });
  const { name, role, date, notes } = copyright;
  const { id, ID } = useParams();
  const [imagePath, setImagePath] = useState("");

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setImagePath(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePath("");
    }
  };

  const goBack = () => {
    history.push(`/copyrightDetails/${id}/${ID}`);
  };

  const onInputChange = (e) => {
    setCopyright({ ...copyright, [e.target.name]: e.target.value });
  };

  const loadCopyright = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/songs/${id}`);
      const song = response.data;

      for (let i = 0; i < song?.copyright.length; i++) {
        if (song?.copyright[i].id === ID) {
          setCopyright(song?.copyright[i]);
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCopyright();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await axios.get(`http://localhost:8000/songs/${id}`);
      const song = response.data;

      const updatedList = song?.copyright.map((item) => {
        if (item.id === ID) {
          return {
            ...item,
            name: name,
            date: date,
            role: role,
            notes: notes,
            image: imagePath || item.image,
          };
        }
        return item;
      });

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
      <h2>Editare drepturi de autor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nume nou:</label>
        <input
          type="text"
          required
          value={name}
          name="name"
          onChange={onInputChange}
        />
        <label>Dată nouă:</label>
        <input
          type="date"
          required
          value={date}
          name="date"
          onChange={onInputChange}
        />
        <label>Rol nou:</label>
        <select
          type="text"
          required
          value={role}
          name="role"
          onChange={onInputChange}
        >
          <option value="" disabled>
            Selectați un rol
          </option>
          <option value="Compozitor">Compozitor</option>
          <option value="Textier">Textier</option>
          <option value="Aranjor">Aranjor</option>
          <option value="Adaptor text">Adaptor text</option>
          <option value="Admin drepturi de autor">
            Admin drepturi de autor
          </option>
        </select>
        <label>Notițe noi:</label>
        <input
          type="text"
          value={notes}
          name="notes"
          onChange={onInputChange}
        />
        <label>Imagine nouă</label>
        <input type="file" name="image" onChange={onFileChange} />
        {imagePath && <img src={imagePath} alt="Preview" />}
        <div>
          {!isPending && <button>Modificați</button>}
          {isPending && <button disabled>Modificare...</button>}
          <button onClick={goBack} style={{ marginLeft: "10px" }}>
            Înapoi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCopyright;
