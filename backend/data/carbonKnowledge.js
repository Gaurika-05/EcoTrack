/**
 * Carbon Knowledge Base
 * Contains detailed information about carbon content, equivalences,
 * and reduction strategies for each tracked category.
 */

const carbonKnowledge = {
  Transportation: {
    icon: '🚗',
    color: '#f59e0b',
    factors: {
      miles: { co2PerUnit: 0.4, label: 'miles driven (car)' },
      km: { co2PerUnit: 0.25, label: 'kilometers driven (car)' },
      flights: { co2PerUnit: 255, label: 'short-haul flights' },
      bus_miles: { co2PerUnit: 0.089, label: 'miles by bus' }
    },
    facts: [
      "A single car emits about 4.6 metric tons of CO₂ per year on average.",
      "One round-trip flight from NYC to London produces roughly 1.6 tons of CO₂ per passenger.",
      "Transportation accounts for about 29% of total greenhouse gas emissions globally.",
      "An idling car burns about 0.5 gallons of fuel per hour, producing 4.4 kg of CO₂.",
      "Electric vehicles produce 50-70% fewer emissions than gasoline cars over their lifetime."
    ],
    equivalences: {
      miles: "Driving 1 mile ≈ burning 0.36 lbs of coal ≈ charging your phone 48 times",
      flights: "One short flight ≈ heating your home for 1 month ≈ 255 kg CO₂"
    },
    importance: "Transportation is the single largest source of greenhouse gas emissions in many countries. Every mile not driven prevents nearly half a kilogram of CO₂ from entering the atmosphere.",
    reductions: [
      { action: "Carpool with one person", savings: "50% reduction per trip", impact: "high" },
      { action: "Switch to public transit", savings: "Up to 75% reduction", impact: "high" },
      { action: "Work from home 2 days/week", savings: "~0.8 tons CO₂/year", impact: "high" },
      { action: "Maintain proper tire pressure", savings: "3% fuel efficiency gain", impact: "low" },
      { action: "Combine errands into one trip", savings: "20-40% fewer miles", impact: "medium" },
      { action: "Switch to an EV or hybrid", savings: "2-3 tons CO₂/year", impact: "high" }
    ]
  },

  Energy: {
    icon: '⚡',
    color: '#3b82f6',
    factors: {
      kWh: { co2PerUnit: 0.9, label: 'kilowatt-hours of electricity' },
      therms: { co2PerUnit: 5.3, label: 'therms of natural gas' },
      gallons_propane: { co2PerUnit: 5.7, label: 'gallons of propane' }
    },
    facts: [
      "The average US household emits about 7.5 tons of CO₂ per year from energy use alone.",
      "Leaving a single 60W light bulb on for 24 hours produces about 1.3 kg of CO₂.",
      "Air conditioning accounts for about 12% of US home energy expenditure.",
      "A single Google search uses about 0.3 Wh of energy, producing 0.2g of CO₂.",
      "Data centers worldwide consume about 1% of global electricity."
    ],
    equivalences: {
      kWh: "1 kWh ≈ running a 100W bulb for 10 hours ≈ 0.9 kg CO₂ ≈ driving 2.25 miles"
    },
    importance: "Energy production is the world's largest source of greenhouse gases. Residential energy use makes up about 20% of total emissions. Small changes in how we use energy at home have massive collective impact.",
    reductions: [
      { action: "Switch to LED bulbs", savings: "75% less energy per bulb", impact: "medium" },
      { action: "Unplug devices when not in use", savings: "5-10% of energy bill", impact: "low" },
      { action: "Set thermostat 2°F lower in winter", savings: "~180 kg CO₂/year", impact: "medium" },
      { action: "Use a smart power strip", savings: "5-10% standby power waste", impact: "low" },
      { action: "Switch to renewable energy provider", savings: "Up to 100% grid emissions", impact: "high" },
      { action: "Improve home insulation", savings: "Up to 1.5 tons CO₂/year", impact: "high" }
    ]
  },

  Food: {
    icon: '🍔',
    color: '#ef4444',
    factors: {
      meals: { co2PerUnit: 2.5, label: 'meat-based meals' },
      veg_meals: { co2PerUnit: 0.7, label: 'vegetarian meals' },
      vegan_meals: { co2PerUnit: 0.4, label: 'vegan meals' }
    },
    facts: [
      "The food system is responsible for about 26% of global greenhouse gas emissions.",
      "Producing 1 kg of beef generates 27 kg of CO₂ — more than driving 60 miles.",
      "Food waste alone accounts for 6% of global greenhouse gas emissions.",
      "A single hamburger requires approximately 660 gallons of water to produce.",
      "Cheese production generates about 13.5 kg CO₂ per kg — more than chicken or pork."
    ],
    equivalences: {
      meals: "1 meat meal ≈ 2.5 kg CO₂ ≈ driving 6.25 miles ≈ 2.8 kWh of electricity"
    },
    importance: "What we eat is one of the most impactful personal choices we make for the climate. Livestock alone accounts for 14.5% of global emissions. Shifting even a few meals per week can dramatically reduce your footprint.",
    reductions: [
      { action: "Go meatless 1 day per week", savings: "~170 kg CO₂/year", impact: "medium" },
      { action: "Replace beef with chicken", savings: "~60% reduction per meal", impact: "medium" },
      { action: "Buy local and seasonal produce", savings: "10-15% food emissions", impact: "low" },
      { action: "Reduce food waste by planning meals", savings: "~300 kg CO₂/year", impact: "high" },
      { action: "Switch to plant-based milk", savings: "~3x less emissions vs dairy", impact: "low" },
      { action: "Grow your own herbs and vegetables", savings: "Near-zero transport emissions", impact: "low" }
    ]
  },

  Shopping: {
    icon: '🛍️',
    color: '#a855f7',
    factors: {
      items: { co2PerUnit: 10, label: 'new consumer items' },
      clothing: { co2PerUnit: 15, label: 'clothing items' },
      electronics: { co2PerUnit: 50, label: 'electronic devices' }
    },
    facts: [
      "The fashion industry alone produces 10% of global carbon emissions.",
      "Manufacturing a single cotton t-shirt generates about 7 kg of CO₂.",
      "A new smartphone's manufacturing produces about 70 kg of CO₂.",
      "The average American generates 80 lbs of textile waste per year.",
      "Packaging accounts for about 5% of energy used in food production."
    ],
    equivalences: {
      items: "1 average purchase ≈ 10 kg CO₂ ≈ driving 25 miles ≈ 11 kWh of electricity",
      clothing: "1 clothing item ≈ 15 kg CO₂ ≈ 6 meat meals"
    },
    importance: "Consumer goods carry a hidden carbon cost from raw material extraction, manufacturing, shipping, and eventual disposal. Fast fashion and disposable electronics are among the worst offenders.",
    reductions: [
      { action: "Buy second-hand clothing", savings: "Up to 82% reduction per item", impact: "high" },
      { action: "Repair instead of replace", savings: "50-90% emissions avoided", impact: "high" },
      { action: "Choose quality over quantity", savings: "Reduces replacement frequency", impact: "medium" },
      { action: "Use reusable bags and containers", savings: "~5 kg CO₂/year", impact: "low" },
      { action: "Extend device lifespan by 1 year", savings: "~30 kg CO₂ per device", impact: "medium" },
      { action: "Support sustainable brands", savings: "Up to 50% lower footprint", impact: "medium" }
    ]
  }
};

module.exports = carbonKnowledge;
