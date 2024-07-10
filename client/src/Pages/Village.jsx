import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Table.css";

function VillagePage() {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    async function fetchVillages() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios({
          method: "GET",
          url: `http://localhost:3000/villages`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVillages(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVillages();
  }, []);

  return (
    <div>
      <h1
        className="text-center primary mb-0"
        style={{ backgroundColor: "white", padding: "1rem" }}
      >
        List of Villages
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Name</th>
            <th scope="col">Leader</th>
            <th scope="col">History</th>
          </tr>
        </thead>
        <tbody>
          {villages.map((village) => (
            <tr className="table-danger" key={village.id}>
              <td>{village.id}</td>
              <td>{village.name}</td>
              <td>{village.leader}</td>
              <td>{village.history}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VillagePage;
