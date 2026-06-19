const express = require('express');
const app = express();

const portfolios = [{ id: 1, name: 'Growth Portfolio', value: 15000 }, { id: 2, name: 'Income Portfolio', value: 10000 }];
const transactions = [{ id: 1, portfolioId: 1, date: '2023-10-01', type: 'buy', amount: 5000 }, { id: 2, portfolioId: 2, date: '2023-10-02', type: 'sell', amount: 3000 }];
const marketData = [{ id: 'AAPL', name: 'Apple Inc.', price: 150 }, { id: 'GOOGL', name: 'Alphabet Inc.', price: 2800 }];
const reports = [{ id: 1, name: 'Monthly Report', date: '2023-10-01' }, { id: 2, name: 'Quarterly Report', date: '2023-07-01' }];

const getPortfolios = () => portfolios;
const getTransactions = () => transactions;
const getMarketData = () => marketData;
const getReports = () => reports;

app.get('/api/portfolios', (req, res) => res.json(getPortfolios()));
app.get('/api/transactions', (req, res) => res.json(getTransactions()));
app.get('/api/marketdata', (req, res) => res.json(getMarketData()));
app.get('/api/reports', (req, res) => res.json(getReports()));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
