import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [asset, setAsset] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchMarketData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get('/api/marketdata');
      setMarketData(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const handleTransaction = async (type) => {
    try {
      const mockTransactionId = transactions.length + 1; // Placeholder for transaction ID
      const newTransaction = {
        id: mockTransactionId,
        date: new Date().toISOString().split('T')[0],
        portfolioId: 1,  // Assume default portfolio
        type,
        amount: parseFloat(amount)
      };
      // Simulate transaction addition to mock API
      setTransactions([...transactions, newTransaction]);
      alert(`${type} transaction processed successfully!`);
    } catch (error) {
      console.error(`Error processing ${type} transaction:`, error);
    }
  };

  return (
    <div>
      <h2>Portfolio Management</h2>
      <div>
        <label htmlFor="asset">Select Asset:</label>
        <select id="asset" onChange={e => setAsset(e.target.value)} value={asset}>
          {marketData.map(md => <option key={md.id} value={md.id}>{md.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button onClick={() => handleTransaction('buy')}>Buy</button>
      <button onClick={() => handleTransaction('sell')}>Sell</button>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>{t.date} - {t.type.toUpperCase()} - Amount: ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioManagement;