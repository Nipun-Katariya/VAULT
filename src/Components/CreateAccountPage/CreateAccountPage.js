import React, { useState } from 'react';
import './CreateAccountPage.css';
import { createNewAccount } from '../../Services/ethereumService.js'; // Import createNewAccount from ethereumService.js
import { generateWalletId } from '../../Services/mnemonicGenerator.js';
import { useHistory } from "react-router-dom";
import usersData from "./usersData.json";


const CreateAccountPage = () => {
  const [username, setUsername] = useState('');
  const [generatedPhrase, setGeneratedPhrase] = useState('');
  const [publicId, setPublicId] = useState('');
  const [address, setAddress] = useState(''); // State to store the address
  const [step, setStep] = useState(1);
  const [privateKey, setPrivateKey] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');


  // const handleCreate = async() => {
  //   // Generate a random account and get the mnemonic phrase
  //   // Set the generated phrase to the mnemonic of the account
  //   const wallet = await createNewAccount(); // Use await to get the wallet object

  //   setAddress(wallet.address);
  //   setPrivateKey(wallet.privateKey); 
  //   const walletId = generateWalletId(15);
  //   setGeneratedPhrase(walletId);
  //   setStep(2);
  // };



  

  const handleCreate = async () => {
    try {
      // Generate a random account and get the mnemonic phrase
      const wallet = await createNewAccount(); // Use await to get the wallet object
  
      // Check if the username already exists
      const existingUser = usersData.find((userData) => userData.username === username);
      if (existingUser) {
        setError('Username already exists'); // Set the error message
        return; // Stop further execution
      }
  
      setAddress(wallet.address);
      setPrivateKey(wallet.privateKey);
      const walletId = generateWalletId(15);
      setGeneratedPhrase(walletId);
      setError(''); // Clear any previous errors
      setStep(2);
    } catch (error) {
      setError('Failed to create account. Please try again.'); // Set the error message
    }
  };
  

const handleNext = async () => {
  setPublicId(address);

  // Prepare the data to be sent to the backend
  const userData = {
    username,
    privateKey,    
    secretPhrase: generatedPhrase,
    publicId: address,
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/api/store_user_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log('User data stored successfully');
      setStep(3);
    } else {
      const errorData = await response.json(); // Parse the error response
      console.error('Failed to store user data:', errorData.error);
      // Display the error message to the user or handle it as needed
    }
  } catch (error) {
    console.error('Error occurred during the request:', error);
  }
};





const handleCopyPhrase = () => {
  try {
    // Get the generated phrase to be copied
    const content = generatedPhrase;

    // Create a new Blob object with the content and set the MIME type to plain text
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement('a');
    anchor.href = url;

    // Set the anchor's attributes to download the file with the desired filename
    anchor.download = `${username}.txt`;

    // Trigger the download
    anchor.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);

    
   
  } catch (error) {
    console.error('Error copying phrase:', error);
    alert('An error occurred while copying the phrase.');
  }
};


  return (
    <div className="create-account-page">
      {/* {step === 1 && (
        <div className="create-account-box">
          <h1>Create Account</h1>
          <form>
            <label>Enter Your Account Name or Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Account Name"
              required
            />
            <button type="button" onClick={handleCreate}>
              Create
            </button>
          </form>
        </div>
      )} */}

{step === 1 && (
  <div className="create-account-box">
    <h1>Create Account</h1>
    <form>
      <label>Enter Your Account Name or Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Account Name"
        required
      />
      <button type="button" onClick={handleCreate}>
        Create
      </button>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </form>
  </div>
)}



      {step === 2 && (
        <div className="create-account-box">
          <h1>Generated Unique Wallet ID</h1>
          <p className='phrase'>{`***********${generatedPhrase.slice(-4)}`}</p>
          <button type="button" onClick={handleCopyPhrase}>
            Download
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="create-account-box-3">
          <h1>Generated Public ID</h1>
          <p>{address}</p>
          <button type="button" onClick={() => history.push("/dashboard")}>
            Go to Login Page
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateAccountPage;


