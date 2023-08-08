import React from "react";
import "./LoadingScreen.css"
import { LOADING } from "../../../assets/Images";
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      {/* <img src="./assets/loading.gif" alt="Loading" /> */}
      <div>

      <img src={LOADING} className="giphy-embed" allowFullScreen></img>
      <p> Hang on while we securely process your transaction!</p>      
      {/* <h3>Loading...</h3> */}
      </div>
    </div>
  );
};


export default LoadingScreen;
