import React, { useState } from 'react';
import WalletConnection from '../components/WalletConnection';
import TokenAllowance from '../components/TokenAllowance';
import TokenTransfer from '../components/TokenTransfer';

function WalletPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

  return (
    <div>
      <WalletConnection setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <>
          <div>
            <h3>Token Address</h3>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter Token Contract Address"
            />
          </div>
          <TokenAllowance tokenAddress={tokenAddress} walletAddress={walletAddress} />
          <TokenTransfer tokenAddress={tokenAddress} walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
}

export default WalletPage;
