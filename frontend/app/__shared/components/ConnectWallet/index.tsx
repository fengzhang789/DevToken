import React from "react";
import { ethers } from "ethers";

const ConnectWallet: React.FC = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);
        
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed. Please install it.');
    }
  };

  return (
    <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
      Connect MetaMask
    </button>
  );
};

export default ConnectWallet;
