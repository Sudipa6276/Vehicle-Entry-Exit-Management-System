import React, { useState } from 'react';
import axios from '../services/api';
import './SearchByDatetimeRange.css'; // Import the CSS file for styling

const SearchByDatetimeRange = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }

    try {
      const response = await axios.post('/search_by_datetime_range', { start_datetime: startTime, end_datetime: endTime });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching vehicle information by datetime range:', error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search by Datetime Range</h2>
      <div className="datetime-input-container">
        <label>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Gate Number</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.vehicle_id}</td>
                  <td>{result.entry_time}</td>
                  <td>{result.exit_time !== 'NULL' ? result.exit_time : 'N/A'}</td>
                  <td>{result.gate_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-message">No data available for the selected range.</p>
      )}
    </div>
  );
}

export default SearchByDatetimeRange;