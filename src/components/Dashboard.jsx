import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ addToWatchlist }) {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-ZjBJTGESqy2YVi29DD7vFQMN', {
      params: {
        vs_currency: 'INR',
      }
    })
      .then(response => {
        setCoins(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="currency-select">
        <label>Select a currency: </label>
        <select>
          <option value="INR">INR - Indian Rupee</option>
          {/* <option value="USD">USD - US Dollar</option> */}
        </select>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Coin Name"
          onChange={handleChange}
        />
        <button className="buttonlal">Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th   className="headwala">Rank</th>
            <th  className="headwala">Name</th>
            <th  className="headwala">Price</th>
            <th  className="headwala">Price Change (24h)</th>
            <th  className="headwala">Volume (24h)</th>
            <th  className="headwala">Add to Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map(coin => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <Link to={`/coin/${coin.id}`}>{coin.name}</Link>
              </td>
              <td>₹{coin.current_price.toLocaleString()}</td>
              <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td>₹{coin.total_volume.toLocaleString()}</td>
              <td>
                <button className="buttonlal" onClick={() => addToWatchlist(coin)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
