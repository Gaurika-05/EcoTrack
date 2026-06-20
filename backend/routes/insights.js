const express = require('express');
const router = express.Router();
const Footprint = require('../models/Footprint');
const carbonKnowledge = require('../data/carbonKnowledge');

/**
 * Smart Insights Engine
 * Analyzes user's footprint data and generates personalized,
 * contextual reduction suggestions.
 */

function generateSmartInsights(footprints) {
  if (!footprints || footprints.length === 0) {
    return {
      summary: "Start logging your activities to receive personalized AI-powered insights!",
      totalFootprint: 0,
      categoryBreakdown: [],
      personalizedTips: [
        {
          category: 'General',
          icon: '🌱',
          title: 'Welcome to EcoTrack!',
          message: 'Log your first activity to begin receiving personalized carbon reduction strategies.',
          impact: 'Start your journey',
          priority: 'info'
        }
      ],
      funFact: carbonKnowledge.Transportation.facts[0],
      equivalence: null
    };
  }

  // Aggregate by category
  const categoryTotals = {};
  const categoryCount = {};

  footprints.forEach(fp => {
    if (!categoryTotals[fp.category]) {
      categoryTotals[fp.category] = 0;
      categoryCount[fp.category] = 0;
    }
    categoryTotals[fp.category] += fp.co2Equivalent;
    categoryCount[fp.category] += 1;
  });

  const totalFootprint = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  // Build category breakdown with percentages
  const categoryBreakdown = Object.entries(categoryTotals).map(([cat, total]) => ({
    category: cat,
    total: parseFloat(total.toFixed(1)),
    percentage: parseFloat(((total / totalFootprint) * 100).toFixed(1)),
    count: categoryCount[cat],
    icon: carbonKnowledge[cat]?.icon || '📊',
    color: carbonKnowledge[cat]?.color || '#6b7280'
  })).sort((a, b) => b.total - a.total);

  // Generate personalized tips based on data patterns
  const personalizedTips = [];

  // Find the worst category
  const worstCategory = categoryBreakdown[0];
  if (worstCategory) {
    const knowledge = carbonKnowledge[worstCategory.category];
    if (knowledge) {
      // Pick the top 2 highest-impact reductions
      const highImpactReductions = knowledge.reductions
        .filter(r => r.impact === 'high')
        .slice(0, 2);

      highImpactReductions.forEach(reduction => {
        personalizedTips.push({
          category: worstCategory.category,
          icon: knowledge.icon,
          title: `Reduce ${worstCategory.category} Emissions`,
          message: `${worstCategory.category} is your largest source at ${worstCategory.percentage}% of total emissions (${worstCategory.total} kg CO₂e). Try: "${reduction.action}" — potential savings: ${reduction.savings}.`,
          impact: reduction.savings,
          priority: 'critical'
        });
      });
    }
  }

  // Comparative insights
  if (categoryBreakdown.length >= 2) {
    const secondWorst = categoryBreakdown[1];
    const knowledge = carbonKnowledge[secondWorst.category];
    if (knowledge) {
      const mediumReduction = knowledge.reductions.find(r => r.impact === 'medium') || knowledge.reductions[0];
      personalizedTips.push({
        category: secondWorst.category,
        icon: knowledge.icon,
        title: `Optimize ${secondWorst.category}`,
        message: `${secondWorst.category} accounts for ${secondWorst.percentage}% of your footprint. "${mediumReduction.action}" could help: ${mediumReduction.savings}.`,
        impact: mediumReduction.savings,
        priority: 'warning'
      });
    }
  }

  // Add encouraging tips for lower categories
  categoryBreakdown.slice(2).forEach(cat => {
    const knowledge = carbonKnowledge[cat.category];
    if (knowledge) {
      const lowReduction = knowledge.reductions.find(r => r.impact === 'low') || knowledge.reductions[0];
      personalizedTips.push({
        category: cat.category,
        icon: knowledge.icon,
        title: `Fine-tune ${cat.category}`,
        message: `${cat.category} is at ${cat.total} kg CO₂e. Small win: "${lowReduction.action}" — ${lowReduction.savings}.`,
        impact: lowReduction.savings,
        priority: 'info'
      });
    }
  });

  // Generate equivalence for total
  const treesNeeded = (totalFootprint / 22).toFixed(1); // avg tree absorbs ~22kg/year
  const drivingMiles = (totalFootprint / 0.4).toFixed(0);
  const phoneCharges = (totalFootprint * 120).toFixed(0);

  // Generate smart summary
  let summaryTone = '';
  if (totalFootprint < 50) summaryTone = "Great start! Your footprint is relatively low.";
  else if (totalFootprint < 200) summaryTone = "You're building awareness. Let's find ways to cut back.";
  else if (totalFootprint < 500) summaryTone = "Your footprint is moderate. Targeted changes can make a big difference.";
  else summaryTone = "Your footprint is significant. Let's focus on your highest-impact areas.";

  // Random fun fact from the worst category
  const worstKnowledge = carbonKnowledge[worstCategory?.category];
  const randomFact = worstKnowledge?.facts[Math.floor(Math.random() * worstKnowledge.facts.length)] || "Every action counts!";

  return {
    summary: summaryTone,
    totalFootprint: parseFloat(totalFootprint.toFixed(1)),
    categoryBreakdown,
    personalizedTips,
    equivalence: {
      trees: treesNeeded,
      driving: drivingMiles,
      phoneCharges
    },
    funFact: randomFact
  };
}

// GET /api/insights - Smart AI-powered insights
router.get('/', async (req, res) => {
  try {
    const footprints = await Footprint.find().sort({ date: -1 });
    const insights = generateSmartInsights(footprints);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
