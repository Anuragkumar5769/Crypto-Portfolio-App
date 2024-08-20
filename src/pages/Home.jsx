import React from 'react';
import Dashboard from '../components/Dashboard';

function Home({ addToWatchlist }) {
  return (
    <div>
      <Dashboard addToWatchlist={addToWatchlist} />
    </div>
  );
}

export default Home;
