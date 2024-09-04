import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import './Defaulters.css'; // Import the CSS file for styling

const Defaulters = () => {
  const [defaultersData, setDefaultersData] = useState([]);

  useEffect(() => {
    const fetchDefaultersData = async () => {
      try {
        const response = await axios.get('/defaulters'); // Replace with your API endpoint
        console.log('API response:', response.data); // Log the API response
        if (response.data.defaulters && Array.isArray(response.data.defaulters)) {
          setDefaultersData(response.data.defaulters);
        } else {
          console.error('API response does not contain an array of defaulters:', response.data);
        }
      } catch (error) {
        console.error('Error fetching defaulters data:', error);
      }
    };

    fetchDefaultersData();
  }, []);

  return (
    <div className="defaulters-container">
      <h2>Defaulters Data</h2>
      {defaultersData.length > 0 ? (
        <table className="defaulters-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Gate Number</th>
            </tr>
          </thead>
          <tbody>
            {defaultersData.map((defaulter) => (
              <tr key={defaulter.vehicle_id}>
                <td>{defaulter.vehicle_id}</td>
                <td>{defaulter.entry_time}</td>
                <td>{defaulter.exit_time}</td>
                <td>{defaulter.gate_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No defaulters data available.</p>
      )}
    </div>
  );
}

export default Defaulters;
