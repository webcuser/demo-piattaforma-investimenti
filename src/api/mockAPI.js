const express = require('express');
const app = express();

let watchlist = [];
const marketData = [{ id: 'AAPL', name: 'Apple Inc.', price: 150 }, { id: 'GOOGL', name: 'Alphabet Inc.', price: 2800 }];

app.use(express.json());

app.get('/api/watchlist', (req, res) => res.json(watchlist));

app.post('/api/watchlist', (req, res) => {
  const asset = marketData.find(asset => asset.id === req.body.id);
  if (asset) {
    watchlist.push(asset);
    res.status(201).json({ message: 'Asset added to watchlist' });
  } else {
    res.status(404).json({ message: 'Asset not found' });
  }
});

app.delete('/api/watchlist/:id', (req, res) => {
  watchlist = watchlist.filter(asset => asset.id !== req.params.id);
  res.json({ message: 'Asset removed from watchlist' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
