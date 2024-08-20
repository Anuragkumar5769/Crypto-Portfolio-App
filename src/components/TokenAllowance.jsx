import React, { useState } from 'react';
import { ethers } from 'ethers';


function TokenAllowance({ tokenAddress, walletAddress }) {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState(null);

  const checkAllowance = async () => {
    if (!window.ethereum) {
      alert("Please install Metamask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20Abi = [
      "function allowance(address owner, address spender) view returns (uint256)"
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

    try {
      const result = await tokenContract.allowance(walletAddress, spenderAddress);
      setAllowance(ethers.utils.formatUnits(result, 18));
    } catch (error) {
      console.error("Error fetching allowance:", error);
    }
  };

  return (
    <div>
      <h3>Check Token Allowance</h3>
      <input
        type="text"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
        placeholder="Spender Address"
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance !== null && (
        <p>Allowance: {allowance} tokens</p>
      )}
    </div>
  );
}

export default TokenAllowance;

