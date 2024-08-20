import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchlistPage from './pages/WatchlistPage';
import CoinDetailsPage from './pages/CoinDetailsPage';
import WalletPage from './pages/WalletPage';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (coin) => {
    
    if (watchlist.includes(coin)) {
      alert("Already added")
    }
    else{
      alert("Added")
      setWatchlist([...watchlist, coin]);
    }
    
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist(watchlist.filter(coin => coin.id !== coinId));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToWatchlist={addToWatchlist} />} />
        <Route
          path="/watchlist"
          element={<WatchlistPage watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />}
        />
        <Route path="/coin/:coinId" element={<CoinDetailsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import WatchlistPage from './pages/WatchlistPage';
// import CoinDetailsPage from './pages/CoinDetailsPage';
// import WalletPage from './pages/WalletPage';

// function App() {
//   const [watchlist, setWatchlist] = useState([]);

//   const addToWatchlist = (coin) => {
//     setWatchlist((prevList) => [...prevList, coin]);
//   };

//   return (
//     <Router>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/watchlist">Watchlist</Link>
//         <Link to="/wallet">Wallet</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home addToWatchlist={addToWatchlist} />} />
//         <Route path="/watchlist" element={<WatchlistPage watchlist={watchlist} />} />
//         <Route path="/coin/:coinId" element={<CoinDetailsPage />} />
//         <Route path="/wallet" element={<WalletPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
