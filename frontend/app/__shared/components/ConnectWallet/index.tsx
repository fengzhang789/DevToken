"use client";

import React, { useContext } from "react";
import { ethers } from "ethers";
import { UserInformationContext } from "../../contexts/UserInformationContext";

const ConnectWallet: React.FC = () => {
  const { setMetamaskAddress, metamaskAddress, setProvider, setSigner } =
    useContext(UserInformationContext);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        setMetamaskAddress(account);
        setProvider(provider);
        setSigner(signer);

        console.log(provider, signer);
        console.log(account);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed. Please install it.");
    }
  };

  return (
    <div>
      {metamaskAddress ? (
        <button className="bg-green-500 text-white p-2 rounded">
          Connected to MetaMask
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
