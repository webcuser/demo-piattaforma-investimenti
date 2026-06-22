import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await axios.get('/api/marketdata');
      setMarketData(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const addToWatchlist = (assetId) => {
    const asset = marketData.find(a => a.id === assetId);
    setWatchlist([...watchlist, asset]);
    setAlerts({ ...alerts, [assetId]: { priceAlert: false, newsUpdate: false } });
  };

  const removeFromWatchlist = (assetId) => {
    setWatchlist(watchlist.filter(asset => asset.id !== assetId));
    const { [assetId]: _, ...remainingAlerts } = alerts;
    setAlerts(remainingAlerts);
  };

  return (
    <div>
      <h2>Your Watchlist</h2>
      <ul>
        {watchlist.map(asset => (
          <li key={asset.id}>
            {asset.name} - ${asset.price}
            <button onClick={() => removeFromWatchlist(asset.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add to Watchlist:</h3>
      <ul>
        {marketData.map(asset => (
          <li key={asset.id}>
            {asset.name} - ${asset.price}
            <button onClick={() => addToWatchlist(asset.id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
