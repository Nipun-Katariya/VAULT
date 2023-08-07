import React from 'react';
import './ConfirmationPopup.css';

const ConfirmationPopup = ({ transaction, onCancel, onConfirm }) => {
  return (
    <div className="confirmation-popup">
      <h2>Confirm Transaction</h2>
      <p>Please review the transaction details before confirming:</p>
      <div className="transaction-details">
        <p><strong>Value:</strong> {transaction.value}</p>
        <p><strong>To:</strong> {transaction.to}</p>
        <p><strong>Nonce:</strong> {transaction.nonce}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>ChainId:</strong> {transaction.chainId}</p>
        <p><strong>Gas:</strong> {transaction.gas}</p>
        <p><strong>MaxFeePerGas:</strong> {transaction.maxFeePerGas}</p>
        <p><strong>MaxPriorityFeePerGas:</strong> {transaction.maxPriorityFeePerGas}</p>
      </div>
      <div className="button-group">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
