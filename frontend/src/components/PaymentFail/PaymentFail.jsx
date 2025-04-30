import React from 'react';
import './PaymentFail.css';

const PaymentFail = () => {
    return (
      <div className="status-container cancel">
        <h1>❌ Payment Cancelled</h1>
        <p>You have canceled the payment. Please try again when you're ready.</p>
        <a href="/" className="status-button">Go Back</a>
      </div>
    );
  };
  
export default PaymentFail;
