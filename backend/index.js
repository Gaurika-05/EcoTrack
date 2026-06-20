require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const footprintRoutes = require('./routes/footprint');
const insightRoutes = require('./routes/insights');
const knowledgeRoutes = require('./routes/knowledge');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const allowedOrigins = [CLIENT_URL];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push(/^http:\/\/localhost:\d+$/);
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((allowedOrigin) => {
      return typeof allowedOrigin === 'string'
        ? allowedOrigin === origin
        : allowedOrigin.test(origin);
    });
    if (allowed) return callback(null, true);
    callback(new Error(`CORS policy does not allow access from ${origin}`));
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/footprint', footprintRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/knowledge', knowledgeRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/carbon_tracker')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
