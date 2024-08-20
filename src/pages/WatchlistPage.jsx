import React from 'react';
import Watchlist from '../components/Watchlist';

function WatchlistPage({ watchlist, removeFromWatchlist }) {
  return (
    <div>
      <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />
    </div>
  );
}

export default WatchlistPage;
