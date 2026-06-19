import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reportistica = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="reportistica-container">
      <h2>Investment Reports</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>{report.name} - {report.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reportistica;
