const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const Member = require('./models/Member');

dotenv.config();
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('Server is running ✅'));

app.get('/', async (req, res) => {
  try {
    const url = 'https://rsmssb.rajasthan.gov.in/page?menuName=Home'; // example
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const jobs = [];

    $('a[href*="Patwari"]').each((i, el) => {
      jobs.push({
        title: $(el).text().trim(),
        link: 'https://rsmssb.rajasthan.gov.in/' + $(el).attr('href'),
      });
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { name, email, phone, amount } = req.body;
  const durationMonths = amount / 2000;
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(startDate.getMonth() + durationMonths);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: `Library Membership for ${name}` },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/fail',
    });

    await Member.create({
      name,
      email,
      phone,
      durationMonths,
      startDate,
      endDate,
      paymentStatus: 'paid',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: 'Session creation failed' });
  }
});

app.use('/members', require('./routes/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
