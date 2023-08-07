import React, { useState, useContext, useEffect } from 'react';
import './SendCrypto.css';
import axios from 'axios';
import usersData from "../CreateAccountPage/usersData.json";
import rot13_decrypt from '../../Services/encryption';
import { AuthContext } from '../../Authorisation/AuthContext';
import { ethers } from 'ethers';

const SendCrypto = ({ onClose, setLoading }) => {
  const [senderAddress, setSenderAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showPopup, setShowPopup] = useState('');
  const [response, setResponse] = useState('');

  const authContext = useContext(AuthContext); // Access the AuthContext here
  const authorizedPublicKey = authContext.publicKey;

  useEffect(() => {
    if (authorizedPublicKey) {
      const user = usersData.find((userData) => userData.publicId === authorizedPublicKey);
  
      if (user) {
        setSenderAddress(user.publicId);
        handleSet(user.publicId);
      }
    }
  }, [authorizedPublicKey]);
  
  const handleClosePopup = () => {
    setShowPopup(false);
    onClose()
  };

  const handleSet = (authorizedPublicKey) => {
    // Get the user object based on the provided public address
    const user = usersData.find((userData) => userData.publicId === senderAddress);


    if (user) {
      // Found the user, now you can access their private key
      const privateKey = user.privateKey;
      const decryptedPrivateKey = rot13_decrypt(privateKey);


      // Prepare the API request data with the decrypted private key
      const apiUrl = 'https://u67h5mobnf.execute-api.eu-west-1.amazonaws.com/dev/nitro'; // Replace this with your actual API URL
      const requestData = {
        operation: 'set_key',
        eth_key: decryptedPrivateKey,
      };

      // Send the API request
      axios
        .post(apiUrl, requestData)
        // .then((response) => {
        //   console.log('API Response:', response.data);
        //   // You can set the response data to state if needed
        //   // setResponse(response.data);
        // })
        .catch((error) => {
          console.error('Error:', error);
        });


      // Do something with the private key, like setting it to state or using it for encryption/signing
    } else {
      console.log('User not found for the given public address:', senderAddress);
    }
  };

  const handleSend = async (event) => {
    event.preventDefault();
    const animationCompleted = false;
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 7000);
    const apiUrl = 'https://u67h5mobnf.execute-api.eu-west-1.amazonaws.com/dev/nitro';

    const requestData = {
      operation: 'sign_transaction',
      transaction_payload: {
        value: amount,
        to: destinationAddress,
        nonce: 0,
        type: 2,
        chainId: 4,
        gas: 100000,
        maxFeePerGas: 100000000000,
        maxPriorityFeePerGas: 3000000000,
      },
    };

    axios
      .post(apiUrl, requestData)
      .then((response) => {
        // Parse the API response body to extract the transaction hash
        setResponse(response.data);
        const responseBody = JSON.parse(response.data.body);
        const transactionHash = responseBody.transaction_hash;

        // Prepare the data to send to the Python server
        const dataToSend = {
          transactionHash,
          senderAddress,
          destinationAddress,
          amount,
          timestamp: new Date().toISOString(),
        };

        // Make a POST request to the Python server to store the data in transaction history
        const pythonServerUrl = 'http://127.0.0.1:5000/api/store_transaction_data'; // Replace this with the actual URL of your Python server
        axios
          .post(pythonServerUrl, dataToSend)
          .then((response) => {
            console.log('Data sent to Python server:', response.data);

            // You can handle any additional logic after successfully sending the data
          })
          .catch((error) => {
            console.error('Error sending data to Python server:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  };



  return (
    <div className="send-crypto-modal">
      {/* <form style = {{...styles.FlexContainer, ...active}} onSubmit = {(e) => {transfer(e, to, value);handeModalChange("close")}} > */}
      <div className='title'>
        <h2><b>Send Crypto</b></h2>
        <button type="submit" onClick={handleClosePopup}>❌</button>
      </div>
      <hr />
      <div className="input-fields">

        <label htmlFor="destination-address">Sender address:</label>
        <input
          type="text"
          id="sender-address"
          value={senderAddress}
          onChange={(e) => {
            setSenderAddress(e.target.value);
            // Call handleSet when input is detected in the sender address field
          }}
        />
        {senderAddress !== authorizedPublicKey  && <p className="error-message">Invalid address</p>}


        <label htmlFor="destination-address">Receiver address:</label>
        <input
          type="text"
          id="destination-address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="button-send" onClick={handleSend}>Send</button>
      <br />
      <br></br>
      <div className='response'>
        <h2>Transaction Response:</h2>
        <p style={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' }}>
          {JSON.stringify(response, null, 2)}
        </p>


      </div>
    </div>
  );
};

export default SendCrypto;
