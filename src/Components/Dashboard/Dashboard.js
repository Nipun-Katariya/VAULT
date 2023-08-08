import React, { useState, useContext, useEffect} from "react";

import "./Dashboard.css";
import VerticalBar from "./VerticalBar";
import ViewTransaction from "./ViewTransaction";
import SendCrypto from "./SendCrypto";
import { FIL, VAULT, ETHEREUM, RIPPLE, BITCOIN, NFT, LITECOIN} from "../../assets/Images";
import LoadingScreen from "./LoadingPage/LoadingScreen";
import { AuthContext } from "../../Authorisation/AuthContext";
import usersData from '../CreateAccountPage/usersData.json'

const Dashboard = () => {

  const authContext = useContext(AuthContext); // Access the AuthContext here
  const authorizedPublicKey = authContext.publicKey;
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("history");
  const [publicId, setPublicId] = useState(authorizedPublicKey); // Replace with actual user public ID
  const [accountBalance, setAccountBalance] = useState("0.00"); // Replace with actual account balance
  const [userName, setUser] = useState(''); // Replace with actual account balance
  
  useEffect(() => {
    // Assuming your JSON structure is like: { publicId: "xxx", balance: "xxx" }
    const userData = usersData.find(data => data.publicId === publicId);
    if (userData) {
      setPublicId(userData.publicId)
      setAccountBalance(userData.balance);
      setUser(userData.username);
    }
  }, [publicId]); // Run this effect only when `publicId` changes

  const renderView = () => {
    switch (selectedOption) {

      case "send":
        return <SendCrypto onClose={() => { setSelectedOption("") }} setLoading={setLoading} />;

      default:
        return null;
    }
  };

  return (

    <>{loading && <LoadingScreen />}
      <div className="dashboard">
        <VerticalBar
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
        />
        <div className="fid-logo">

          <img src={VAULT} alt="VAULT" className="vault-image" />
          <img src={FIL} alt="FIL" className="fil-image" />
        </div>

        <div className="center-view">
          
          <main className="ml-16 px-8">
            <div className="border-b-2 text-sm flex gap-4 justify-center border-gray-300">
              <div className=" border-blue-500 p-4 relative flex flex-col items-center gap-2">
                <a href="#">
                  <img
                    src={ETHEREUM}
                    alt="eth"
                    className="h-8 w-8"
                  />Ethereum
                </a>
                <div className="h-0.5 bg-blue-500 w-full absolute -bottom-[1px]"></div>
              </div>

              <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
                <a href="#">
                  <img
                    src={RIPPLE}
                    alt="ripple"
                    className="h-8 w-8"
                  />Ripple
                </a>

              </div>
              <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
                <a href="#">
                  <img
                    src={BITCOIN}
                    alt="bitcoin"
                    className="h-8 w-8"
                  />Bitcoin
                </a>

              </div>

              <div className=" border-blue-500 p-4 flex flex-col items-center gap-2">
                <a href="#"><img
                  src={LITECOIN}
                  alt=""
                  className="h-8 w-8"
                />Litecoin
                </a>
              </div>

              <div className=" border-blue-500 p-4 flex flex-col items-center gap-2 justify-center">
                <a href="#">
                  <img
                    src={NFT}
                    alt=""
                    className="h-8 w-8"
                  />NFT
                </a>
                {/* <button onClick={""}>Token</button> */}
              </div>


            </div>
          </main>
          <h1><b>Welcome, {userName}.</b></h1>
          <h2><b>Your Public Address:</b> {publicId}</h2>
          <h3><b>Balance:</b> {accountBalance} ETH</h3>

          <button
            type="button"
            className="crypto-button"
            onClick={() => {
              setSelectedOption("send");
            }}
          >
            <b>Transfer ETH &#x26A1;</b>
          </button>
          <div className="trans">
            <ViewTransaction />
          </div>
          {renderView()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
