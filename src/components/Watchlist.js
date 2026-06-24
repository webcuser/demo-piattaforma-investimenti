import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const marketResponse = await axios.get('/api/marketdata');
        setPriceAlerts(marketResponse.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    const fetchNewsUpdates = async () => {
      try {
        const newsResponse = await axios.get('/api/news');
        setNewsUpdates(newsResponse.data);
      } catch (error) {
        console.error('Error fetching news updates:', error);
      }
    };

    fetchMarketData();
    fetchNewsUpdates();
  }, []);

  const addToWatchlist = (asset) => {
    setWatchlist([...watchlist, asset]);
  };

  const removeFromWatchlist = (assetId) => {
    setWatchlist(watchlist.filter(asset => asset.id !== assetId));
  };

  return (
    <div>
      <h2>Watchlist</h2>
      <ul>
        {watchlist.map(asset => (
          <li key={asset.id}>
            {asset.name} <button onClick={() => removeFromWatchlist(asset.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Price Alerts</h3>
      <ul>
        {priceAlerts.map(alert => (
          <li key={alert.id}>{alert.name}: ${alert.price}</li>
        ))}
      </ul>
      <h3>News Updates</h3>
      <ul>
        {newsUpdates.map(update => (
          <li key={update.id}>{update.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
