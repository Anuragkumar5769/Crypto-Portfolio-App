import React, { useState } from 'react';
import { ethers } from 'ethers';

function TokenTransfer({ tokenAddress, walletAddress }) {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const transferTokens = async () => {
    if (!window.ethereum) {
      alert("Please install Metamask!");
      return;
    }

    if (!ethers.utils.isAddress(recipientAddress)) {
      alert("Invalid recipient address.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20Abi = [
      "function transfer(address to, uint amount) returns (bool)"
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

    try {
      const tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div>
      <h3>Transfer Tokens</h3>
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={transferTokens}>Transfer</button>
    </div>
  );
}

export default TokenTransfer;

