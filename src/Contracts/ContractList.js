import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ContractList({ copyright, ID }) {
  const { id } = useParams();
  const [contractsList, setContractsList] = useState([]);

  useEffect(() => {
    let contracts = [];
    for (let i = 0; i < copyright.length; i++) {
      if (copyright[i].id === ID) contracts = copyright[i].contracts;
    }
    setContractsList(contracts);
  }, [copyright, ID]);

  const deleteContract = (number) => {
    axios
      .get(`http://localhost:8000/songs/${id}`)
      .then((response) => {
        const song = response.data;
        const updatedCopyright = song?.copyright.map((item) => {
          if (item.id === ID) {
            const updatedContracts = item.contracts.filter(
              (contract) => contract.number !== number
            );
            return {
              ...item,
              contracts: updatedContracts,
            };
          }
          return item;
        });

        const updatedSong = {
          ...song,
          copyright: updatedCopyright,
        };

        return axios.put(`http://localhost:8000/songs/${id}`, updatedSong);
      })
      .then(() => {
        const updatedContractsList = contractsList.filter(
          (contract) => contract.number !== number
        );
        setContractsList(updatedContractsList);
      })
      .catch((error) => {
        console.error("Error updating contracts list:", error);
      });
  };

  if (contractsList.length === 0) {
    return (
      <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
        Încă nu ați adăugat contracte 😔
      </p>
    );
  }

  return (
    <div className="song-list">
      {contractsList.map((contract) => {
        return (
          <div
            style={{ width: "600px" }}
            className="song-preview"
            key={contract.number}
          >
            <h2>{contract.number}</h2>
            <h2>{contract.type}</h2>
            <button
              className="btn"
              onClick={() => deleteContract(contract.number)}
            >
              Șterge
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ContractList;
