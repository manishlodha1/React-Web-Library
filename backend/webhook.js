const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Member = require('./models/Member');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const { name, email, phone, durationMonths } = session.metadata;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + Number(durationMonths));

    try {
      await Member.create({
        name,
        email,
        phone,
        durationMonths,
        startDate,
        endDate,
        paymentStatus: 'paid',
      });
      console.log("✅ Member saved to DB.");
    } catch (err) {
      console.error("❌ Failed to save member:", err.message);
    }
  }

  res.status(200).send('Webhook received');
});

module.exports = router;
