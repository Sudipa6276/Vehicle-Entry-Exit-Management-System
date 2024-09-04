import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import './HomePage.css'; // Create a separate CSS file for styling

const HomePage = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [gateData, setGateData] = useState({});

  const handleSearch = async () => {
    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }

    try {
      const response = await axios.post('vehicle_stats', {
        start_datetime: startTime,
        end_datetime: endTime
      });
      setGateData(response.data);
    } catch (error) {
      console.error('Error fetching gate data:', error);
    }
  };

  return (
    <div className="homepage-container">
      <h1 >Welcome to Vehicle Management System</h1>
      <div className="button-container">
        <Link to="/vehicle_entry_exit"><button>Vehicle Entry/Exit</button></Link>
        <Link to="/search_by_vehicle_id"><button>Search by Vehicle ID</button></Link>
        <Link to="/search_by_datetime_range"><button>Search by Datetime Range</button></Link>
        <Link to="/defaulters"><button>Defaulters</button></Link>
      </div>

      <div className="datetime-input-container">
        <label>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="table-container">
        <h2>Gate Data</h2>
        {Object.keys(gateData).length > 0 ? (
          <table className="gate-table">
            <thead>
              <tr>
                <th>Gate Number</th>
                <th>Vehicles Entered</th>
                <th>Vehicles Exited</th>
                <th>Vehicles Not Exited</th>
                <th>Percentage Not Exited</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(gateData).map((gate) => (
                <tr key={gate}>
                  <td>{gate}</td>
                  <td>{gateData[gate].vehicles_entered}</td>
                  <td>{gateData[gate].vehicles_exited}</td>
                  <td>{gateData[gate].vehicles_not_exited}</td>
                  <td>{gateData[gate].percentage_not_exited}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No gate data available for the selected range.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;