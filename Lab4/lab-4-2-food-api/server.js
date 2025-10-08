const express = require('express');
const cors = require('cors');
const path = require('path');

const foodRoutes = require('./routes/foods'); // import foodRoutes
const logger = require('./middleware/logger'); // import logger

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger); // ใช้ logger middleware

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
            documentation: '/api/docs'
        }
    });
});

// ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// GET /api/docs
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Food API Documentation',
        version: '1.0.0',
        routes: {
            '/api/foods': 'GET all foods with optional query params: search, category, maxSpicy, vegetarian',
            '/api/foods/:id': 'GET food by ID',
            '/api/docs': 'GET API documentation',
            '/api/stats': 'GET statistics about foods'
        },
        exampleQuery: '/api/foods?search=ผัด&maxSpicy=3&vegetarian=true'
    });
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
    const foods = require('./routes/foods').stack[0].handle.toString().includes('foods') ? [
        { id: 1, name: 'ผัดไทย', category: 'ผัด', spicy: 2, vegetarian: false },
        { id: 2, name: 'ต้มยำกุ้ง', category: 'แกง', spicy: 5, vegetarian: false },
        { id: 3, name: 'แกงเขียวหวาน', category: 'แกง', spicy: 4, vegetarian: true },
        { id: 4, name: 'ผัดผักรวม', category: 'ผัด', spicy: 1, vegetarian: true },
    ] : [];

    const total = foods.length;
    const perCategory = {};
    foods.forEach(f => {
        perCategory[f.category] = (perCategory[f.category] || 0) + 1;
    });
    const spicyLevels = foods.map(f => f.spicy);
    const vegetarianCount = foods.filter(f => f.vegetarian).length;

    res.json({ totalFoods: total, perCategory, spicyLevels, vegetarianCount });
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