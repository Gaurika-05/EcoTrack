const express = require('express');
const router = express.Router();
const Footprint = require('../models/Footprint');

// Get all footprints
router.get('/', async (req, res) => {
  try {
    const footprints = await Footprint.find().sort({ date: -1 });
    res.json(footprints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new footprint
router.post('/', async (req, res) => {
  const footprint = new Footprint({
    category: req.body.category,
    value: req.body.value,
    unit: req.body.unit,
    co2Equivalent: req.body.co2Equivalent
  });

  try {
    const newFootprint = await footprint.save();
    res.status(201).json(newFootprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
