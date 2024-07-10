import { useEffect, useState } from 'react';
import axios from 'axios';


function VillagePage() {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    async function fetchVillages() {
      try {
        const response = await axios.get(`http://localhost:3000/villages`);
        setVillages(response.data);
      } catch (error) {
        console.error('Error fetching villages:', error);
      }
    }

    fetchVillages();
  }, []);

  return (
    <div>
      <h1>List of Villages</h1>
      <ul>
        {villages.map(village => (
          <li key={village.id}>
            <strong>{village.name}</strong> - {village.leader}
            <p>{village.history}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VillagePage;
