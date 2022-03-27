import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./styles.css";
import contract_abi from "./contract_abi.json";

export default function Whitelist() {
  const contractAddress = `0x90b989349A58a20415Cb3ff440b6244cF3737e12`;

  const [numofWhitelisted, setNumofWhitelisted] = useState(null);
  const [connectButtonText, setConnetButtonText] = useState("Connect Wallet");
  const [errorMessage, setErrorMessage] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [joinWhiteListText, setJoinWhiteListText] = useState(
    "Join the Whitelist"
  );

  // state management of provider , signer and contract
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnectedAddress(result[0]);
          setConnetButtonText("Wallet Connected!");
          updateEthers();
        });
    } else {
      setConnectedAddress("Please Install Metamask Extension!");
    }
  };

  const updateEthers = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    console.log(provider.getCode(contractAddress));

    const signer = provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(contractAddress, contract_abi, signer);

    setContract(contract);
  };

  const getNumWhitelistHandler = async () => {
    let number = await contract.numAddressesWhitelisted.length;
    setNumofWhitelisted(number);
  };

  const joinWhitelistHandler = async () => {
    const tx = await contract.addAddressToWhitelist({
      gasLimit: 250000
    });
    await tx.wait();

    setJoinWhiteListText("Succesfully Joined!");
    await getNumWhitelistHandler();
  };

  return (
    <div>
      <div className="main">
        <div>
          <h1 className="title">Welcome to the Whitelist Tutorial!</h1>
          <div className="description">
            Its a whitelist for an NFT collection..
          </div>
          <div>
            <button onClick={connectWalletHandler}>
              {" "}
              {connectButtonText}{" "}
            </button>
            <p> Connected Address : {connectedAddress} </p>
          </div>
          <div className="description">
            <button onClick={getNumWhitelistHandler}>
              {" "}
              Get the number of whitelisted addresses{" "}
            </button>
            {numofWhitelisted} have already joined the Whitelist
          </div>
          <div>
            <button onClick={joinWhitelistHandler}>
              {" "}
              {joinWhiteListText}{" "}
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">Made with &#10084; by Michael Asiedu</footer>
    </div>
  );
}
