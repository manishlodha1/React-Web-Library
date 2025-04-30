import React from 'react';
import './PaymentSuccess.css'

const PaymentSuccess = () => {
    return (
      <div className="status-container success">
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you for your purchase. Your membership has been activated.</p>
        <a href="/" className="status-button">Go Back Home</a>
      </div>
    );
  };
  
export default PaymentSuccess;
