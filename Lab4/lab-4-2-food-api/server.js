const express = require('express');
const cors = require('cors');
const path = require('path');

const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger); // ✅ ใช้ logger

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            random: '/api/foods/random',
            documentation: '/api/docs',
            stats: '/api/stats'
        }
    });
});

// Food routes
app.use('/api/foods', foodRoutes);

// API Documentation
app.get('/api/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
    const foods = require('./data/foods.json');
    const totalFoods = foods.length;
    const categoryCounts = {};
    foods.forEach(f => {
        categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
    });

    res.json({
        success: true,
        totalFoods,
        categories: categoryCounts
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});
