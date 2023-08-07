import React, { useEffect, useState, useContext } from 'react';
import './ViewTransaction.css';
import transactionsData from '../CreateAccountPage/transaction.json'; // Import the transaction data from the JSON file
import { AuthContext } from '../../Authorisation/AuthContext'; // Import the AuthContext

const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const authContext = useContext(AuthContext); // Access the AuthContext here
  const authorizedPublicKey = authContext.publicKey; // Get the authorized public key from the AuthContext

  // Load the transactions from the JSON file and filter based on the authorized public key
  useEffect(() => {
    const filteredTransactions = transactionsData.filter(
      (transaction) =>
        transaction.senderAddress === authorizedPublicKey 
    );
    setTransactions(filteredTransactions);
  }, [authorizedPublicKey]);

  const truncateAddress = (address) => {
    if (address.length <= 8) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleCopyPhrase = (event) => {
    const tooltipText = event.target.getAttribute('data-tip');
    if (tooltipText) {
      const textarea = document.createElement('textarea');
      textarea.value = tooltipText;
      document.body.appendChild(textarea);
  
      // Select the text inside the textarea
      textarea.select();
      // textarea.setSelectionRange(0, 99999); 
  
      // Copy the text to the clipboard
      document.execCommand('copy');
  
      // Remove the temporary textarea element
      document.body.removeChild(textarea);
  
      // Show an alert or any other notification to indicate successful copy
      alert('Text copied to clipboard!');
    }
  };
  

  return (
    <div className="view-transaction">
      <h2>Transaction History</h2>
      <div className="transaction-table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
              <td title={transaction.transactionHash} style={{ cursor: 'pointer' }} >{truncateAddress(transaction.transactionHash)}</td>
              <td title={transaction.senderAddress} style={{ cursor: 'pointer' }} >{truncateAddress(transaction.senderAddress)}</td>
              <td title={transaction.destinationAddress} style={{ cursor: 'pointer' }}>{truncateAddress(transaction.destinationAddress)}</td>
              <td>{`${transaction.amount} ETH`}</td>
              <td>{transaction.timestamp}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ViewTransaction;
