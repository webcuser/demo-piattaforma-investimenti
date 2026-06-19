// Mock API server for investment data
const express = require('express');
const app = express();
const PORT = 3000;

const portfolios = require('./portfolio.json');
const transactions = require('./transactions.json');
const marketData = require('./market_data.json');

app.use(express.json());

// Endpoint for portfolios
app.get('/api/portfolios', (req, res) => {
  res.json(portfolios);
});

// Endpoint for transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// Endpoint for market data
app.get('/api/market-data', (req, res) => {
  res.json(marketData);
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
