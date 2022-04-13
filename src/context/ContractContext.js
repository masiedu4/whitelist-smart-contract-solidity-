/**
 * @description      :
 * @author           : Michael
 * @group            :
 * @created          : 13/04/2022 - 16:15:38
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/04/2022
 * - Author          : Michael
 * - Modification    :
 **/
import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const ContractContext = React.createContext();

const { ethereum } = window;

export const ContractProvider = ({ children }) => {
  const [numofWhitelisted, setNumofWhitelisted] = useState(null);
  const [connectButtonText, setConnetButtonText] = useState("Connect Wallet");
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [joinWhiteListText, setJoinWhiteListText] =
    useState("Join the Whitelist");

  // state management of provider , signer and contract
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  // this function lets you update your provider and signer , and initialize contract
  const updateEthers = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    console.log(provider.getCode(contractAddress));

    const signer = provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    setContract(contract);

    console.log({
      provider,
      signer,
      contract,
    });
  };

  // this function lets you connect the frontend to the blockchain using metamask
  const connectWalletHandler = () => {
    if (ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnectedAddress(result[0]);
          setWalletConnected(true);
          setConnetButtonText("Wallet Connected!");
          updateEthers();
        });
    } else {
      setConnectedAddress("Please Install Metamask Extension!");
    }
  };

  // this function lets anyone know the number of accounts that have joined the whitelist

  const getNumWhitelistHandler = async () => {
    let number = await contract.numAddressesWhitelisted.length;
    setNumofWhitelisted(number);
  };

  // this function lets you join the whitelist when your wallet is connected
  const joinWhitelistHandler = async () => {
    if (isWalletConnected) {
      const tx = await contract.addAddressToWhitelist({
        gasLimit: 250000,
      });
      await tx.wait();

      setJoinWhiteListText("Succesfully Joined!");
      await getNumWhitelistHandler();
    } else {
      setErrorMessage("Please Connect Wallet!");
    }
  };

  return (
	  <ContractContext.Provider value={{connectWalletHandler, connectButtonText, connectButtonText , connectedAddress , getNumWhitelistHandler , numofWhitelisted , joinWhiteListText , joinWhitelistHandler}}>
		  {children}
	  </ContractContext.Provider>
  )
};
