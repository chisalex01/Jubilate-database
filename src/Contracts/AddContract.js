import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddContract = () => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const { id, ID } = useParams();

  const goBack = () => {
    history.goBack();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await axios.get(`http://localhost:8000/songs/${id}`);
      const song = response.data;

      const newContract = {
        number: Number(number),
        type: type,
      };

      const updatedCopyright = song?.copyright.map((item) => {
        if (item.id === ID) {
          return {
            ...item,
            contracts: [...item.contracts, newContract],
          };
        }
        return item;
      });

      const updatedSong = {
        ...song,
        copyright: updatedCopyright,
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
      <h2>Adăugare contract</h2>
      <form onSubmit={handleSubmit}>
        <label>Numărul contractului:</label>
        <input
          type="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <label>Tipul contractului</label>
        <select required value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Selectați un tip de contract
          </option>
          <option value="Contract de Cesiune">Contract de cesiune</option>
          <option value="Contract de editare">Contract de editare</option>
          <option value="Plată în străinătate">Plată în străinătate</option>
        </select>
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

export default AddContract;
