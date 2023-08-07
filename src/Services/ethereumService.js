import { ethers } from 'ethers';

// Local Ganache provider URL
// Replace with your Ganache URL

// Create the provider using Ganache URL
const provider = new ethers.providers.JsonRpcProvider();

// Function to create a random account
const createNewAccount = () => {
  try {
    const wallet = ethers.Wallet.createRandom(); // Generate a new random wallet


    return wallet;
  } catch (error) {
    console.error('Error creating account:', error.message);
    return null;
  }
};

export {
  createNewAccount,
};
