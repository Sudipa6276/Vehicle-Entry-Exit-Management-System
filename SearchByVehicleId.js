import React, { useState } from 'react';
import axios from '../services/api';
import './SearchByVehicleId.css'; // Import the CSS file for styling

const SearchByVehicleId = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/search_by_vehicle_id', { vehicle_id: vehicleId });
      setVehicleInfo(response.data);
    } catch (error) {
      console.error('Error fetching vehicle information:', error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search by Vehicle ID</h2>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {vehicleInfo.length > 0 && (
        <div className="table-container">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Gate Number</th>
              </tr>
            </thead>
            <tbody>
              {vehicleInfo.map((vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <td>{vehicle.vehicle_id}</td>
                  <td>{vehicle.entry_time}</td>
                  <td>{vehicle.exit_time !== 'NULL' ? vehicle.exit_time : 'N/A'}</td>
                  <td>{vehicle.gate_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchByVehicleId;
