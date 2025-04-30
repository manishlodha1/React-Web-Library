import React, { useState } from 'react';
import './AddNewMember.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Replace with your actual Stripe public key

const AddNewMember = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    duration: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 1. Validate required fields
    const { fullName, email, phone, duration } = formData;
    console.log('📤 Form submitted with data:', { fullName, email, phone, duration });
  
    if (!fullName || !email || !duration) {
      console.warn('⚠️ Missing required fields');
      alert('Please fill in all required fields');
      return;
    }
  
    // 2. Prepare data for backend
    const requestData = {
      name: fullName,
      email,
      phone,
      amount: parseInt(duration) * 5000, // ₹20/month
    };
  
    console.log('📦 Sending data to backend:', requestData);
  
    try {
      // 3. Call backend to create Stripe checkout session
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
      console.log('📥 Response from backend:', result);
  
      if (!response.ok) {
        console.error('❌ Backend error:', result.error);
        alert('Payment session creation failed.');
        return;
      }
  
      // 4. Redirect to Stripe Checkout
      const stripe = await stripePromise;
      console.log('💳 Stripe object loaded:', stripe);
  
      const { id: sessionId } = result;
      console.log('➡️ Redirecting to Stripe checkout with session ID:', sessionId);
  
      const redirectResult = await stripe.redirectToCheckout({ sessionId });
  
      if (redirectResult.error) {
        console.error('❌ Stripe redirect error:', redirectResult.error.message);
        alert('Stripe checkout failed. Please try again.');
      }
  
    } catch (error) {
      console.error('❗ Error during submission:', error);
      alert('Something went wrong. Please try again later.');
    }
  };  

  return (
    <div className="join-container">
      <h2>Join Our Library</h2>
      <p>Fill out the form below to become a member.</p>
      <form className="join-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter mobile number"
          value={formData.phone}
          onChange={handleChange}
        />
        <select name="duration" value={formData.duration} onChange={handleChange}>
          <option value="">Select Membership Duration (Months)</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Month{i > 0 ? 's' : ''}
            </option>
          ))}
        </select>
        <button type="submit">Pay & Join</button>
      </form>
    </div>
  );
};

export default AddNewMember;