import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    fetchWatchlist();
    fetchMarketData();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get('/api/watchlist');
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
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

  const addAssetToWatchlist = async (assetId) => {
    try {
      await axios.post('/api/watchlist', { id: assetId });
      fetchWatchlist();
    } catch (error) {
      console.error('Error adding asset to watchlist:', error);
    }
  };

  const removeAssetFromWatchlist = async (assetId) => {
    try {
      await axios.delete(`/api/watchlist/${assetId}`);
      fetchWatchlist();
    } catch (error) {
      console.error('Error removing asset from watchlist:', error);
    }
  };

  return (
    <div>
      <h2>Your Watchlist</h2>
      <ul>
        {watchlist.map(asset => (
          <li key={asset.id}>
            {asset.name} - ${asset.price}
            <button onClick={() => removeAssetFromWatchlist(asset.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add to Watchlist</h3>
      <ul>
        {marketData.map(asset => (
          <li key={asset.id}>
            {asset.name} - ${asset.price}
            <button onClick={() => addAssetToWatchlist(asset.id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
