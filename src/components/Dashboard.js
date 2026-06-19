import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioData, setPortfolioData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('/api/portfolios').then(response => {
      const totalValue = response.data.reduce((sum, portfolio) => sum + portfolio.value, 0);
      setPortfolioValue(totalValue);

      const labels = response.data.map(p => p.name);
      const data = response.data.map(p => p.value);
      setPortfolioData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      });
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Financial Dashboard</h1>
      <div className="my-4">
        <h2>Total Portfolio Value: ${portfolioValue}</h2>
      </div>
      <div className="my-4">
        <Doughnut data={portfolioData} />
      </div>
      <div className="my-4">
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Portfolio Value Over Time',
                data: [12000, 15000, 13000, 17000, 18000, 16000, 19000, 21000, 20000, 22000, 23000, 24000],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
