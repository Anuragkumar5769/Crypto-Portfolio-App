import React, { useState } from 'react';
import { ethers } from 'ethers';


function WalletConnection({ setWalletAddress }) {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (setWalletAddress && typeof setWalletAddress === 'function') {
          setWalletAddress(accounts[0]);
        } else {
          console.error("setWalletAddress is not a valid function");
        }
        setWalletConnected(true);
      } else {
        alert("Please install Metamask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <h2>Wallet Connection</h2>
      <button onClick={connectWallet}>
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}

export default WalletConnection;

