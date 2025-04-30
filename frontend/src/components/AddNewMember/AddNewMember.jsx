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

    if (!formData.fullName || !formData.email || !formData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const stripe = await stripePromise;

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          amount: parseInt(formData.duration) * 2000, // ₹20 per month
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error('Stripe checkout error:', err);
      alert('Something went wrong. Try again later.');
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
