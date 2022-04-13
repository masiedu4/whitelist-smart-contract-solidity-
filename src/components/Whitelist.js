/**
 * @description      :
 * @author           : Michael
 * @group            :
 * @created          : 13/04/2022 - 16:05:25
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/04/2022
 * - Author          : Michael
 * - Modification    :
 **/
import { useContext } from "react";
import { ethers } from "ethers";
import "../styles.css";

import contract_abi from "../utils/contract_abi.json";
import { ContractContext } from "../context/ContractContext";

export default function Whitelist() {
  const {
    connectWalletHandler,
    connectButtonText,
    connectedAddress,
    getNumWhitelistHandler,
    numofWhitelisted,
    joinWhitelistHandler,
    joinWhiteListText,
    isWalletConnected,
    errorMessage,
  } = useContext(ContractContext);

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
            {isWalletConnected ? (
              <button onClick={joinWhitelistHandler}>
                {joinWhiteListText}
              </button>
            ) : (
              <p> {errorMessage} </p>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">Made with &#10084; by Michael Asiedu</footer>
    </div>
  );
}
