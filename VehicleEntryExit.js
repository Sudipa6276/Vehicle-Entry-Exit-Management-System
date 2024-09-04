import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import './VehicleEntryExit.css'; // Import the CSS file for styling

const VehicleEntryExit = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get('vehicle_entry_exit'); // Replace with your API endpoint
        console.log('API response:', response.data); // Log API response
        setVehicleData(response.data);
      } catch (error) {
        console.error('Error fetching vehicle entry/exit data:', error);
      }
    };

    fetchVehicleData();
  }, []);

  useEffect(() => {
    console.log('Vehicle Data:', vehicleData); // Log vehicle data to check if it's set correctly
  }, [vehicleData]);

  return (
    <div className="vehicle-entry-exit-container">
      <h2>Vehicle Entry/Exit Data</h2>
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
            {vehicleData.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.vehicle_id}</td>
                <td>{vehicle.entry_time}</td>
                <td>{vehicle.exit_time !== 'NULL' ? vehicle.exit_time : 'N/A'}</td>
                <td>{vehicle.gate_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleEntryExit;
