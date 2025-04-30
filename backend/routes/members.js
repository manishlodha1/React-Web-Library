const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

router.get('/expiring-soon', async (req, res) => {
  const now = new Date();
  const soon = new Date();
  soon.setDate(now.getDate() + 7);
  const expiring = await Member.find({ endDate: { $gte: now, $lte: soon } });
  res.json(expiring);
});

module.exports = router;
