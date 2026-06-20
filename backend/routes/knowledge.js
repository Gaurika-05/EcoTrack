const express = require('express');
const router = express.Router();
const carbonKnowledge = require('../data/carbonKnowledge');

// GET /api/knowledge - Get full carbon knowledge base
router.get('/', (req, res) => {
  res.json(carbonKnowledge);
});

// GET /api/knowledge/:category - Get knowledge for a specific category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  if (carbonKnowledge[category]) {
    res.json(carbonKnowledge[category]);
  } else {
    res.status(404).json({ message: `Category "${category}" not found.` });
  }
});

module.exports = router;
