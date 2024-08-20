import React from 'react';
import { Link } from 'react-router-dom';
import './Watchlist.css';

function Watchlist({ watchlist, removeFromWatchlist }) {
  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      <table>
        <thead>
          <tr>
            <th  className="headwala">Rank</th>
            <th  className="headwala">Name</th>
            <th  className="headwala">Price</th>
            <th  className="headwala">Price Change (24h)</th>
            <th  className="headwala">Volume (24h)</th>
            <th  className="headwala">Remove</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map(coin => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <Link to={`/coin/${coin.id}`}>{coin.name}</Link>
              </td>
              <td>₹{coin.current_price.toLocaleString()}</td>
              <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td>₹{coin.total_volume.toLocaleString()}</td>
              <td>
                <button className="buttonlal" onClick={() => removeFromWatchlist(coin.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
