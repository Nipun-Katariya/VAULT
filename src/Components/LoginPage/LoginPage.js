import React, { useState, useContext } from "react";
import "./LoginPage.css";
import usersData from "../CreateAccountPage/usersData.json";
import { VAULT, FIL, RIGHTPANE } from "../../assets/Images";
import { AuthContext } from '../../Authorisation/AuthContext'; 
import { useHistory } from "react-router-dom";


const LoginPage = () => {
 
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const history = useHistory(); 
  


const handleLogin = (e) => {
    e.preventDefault();  
    const user = usersData.find((user) => user.secretPhrase === secret);
    
    if (user) {
      // Successfully logged in, redirect to the dashboard
      // You can implement the redirect using React Router or any other method
      authContext.setPublicKey(user.publicId);
      history.push("/dashboard");
      console.log('Logged in successfully!');
      
    } else {
      setError('Invalid recovery phrase! Please try again.');
    }
  };

  const handleCreateAccount = () => {
    history.push("/create-account");
  };

  return (
    <div className="login-page">

      <div className="vault-logo">
        <img src={VAULT} />
      </div>

      <div className="fil-logo">
        <img src={FIL} />
      </div>

      <div className="left-pane">
        
      <div className="wallet-box">
          <p className="tagline">In the blockchain world, your private key is everything. That's why we've come up with a way to secure your key even better! <b>Introducing Vault, designed by FIL & supercharged by AWS Nitro Enclaves.</b></p>
        </div>

        <div className="login-box">
          <form onSubmit={handleLogin}>
            
            <label className="field-name"><b>Welcome to Vault.</b> <br></br>Import your existing wallet by entering your secrect recovery phrase.</label>
            <input
              className="input-field"
              type="password"
              placeholder="Begin typing your recovery phrase..."
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="create-account">
          <p className="tagline">Don't have a wallet?<a href="#" onClick={handleCreateAccount} className="create-link"> Create one <u>here</u>.</a></p>
      </div>
      </div>
      <div className="right-pane">
        <img src={RIGHTPANE} alt="right-pane"></img>
      </div>
    </div>
  );
};

export default LoginPage;
