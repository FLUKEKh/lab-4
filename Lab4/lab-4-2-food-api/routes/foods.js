const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ทั้งหมด + filtering
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;

        if (search) {
            const keyword = search.toLowerCase();
            foods = foods.filter(f =>
                f.name.toLowerCase().includes(keyword) ||
                (f.description && f.description.toLowerCase().includes(keyword))
            );
        }

        if (category) {
            foods = foods.filter(f => f.category.toLowerCase() === category.toLowerCase());
        }

        if (maxSpicy) {
            const max = parseInt(maxSpicy);
            foods = foods.filter(f => f.spicy <= max);
        }

        if (vegetarian !== undefined) {
            const isVeg = vegetarian === 'true';
            foods = foods.filter(f => f.vegetarian === isVeg);
        }

        if (available !== undefined) {
            const isAvailable = available === 'true';
            foods = foods.filter(f => f.available === isAvailable);
        }

        if (maxPrice) {
            const price = parseFloat(maxPrice);
            foods = foods.filter(f => f.price <= price);
        }

        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching foods' });
    }
});

// GET /api/foods/category/:category
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category.toLowerCase();
    const filtered = foods.filter(f => f.category.toLowerCase() === category);
    res.json({ success: true, total: filtered.length, data: filtered });
});

// GET /api/foods/random
router.get('/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) return res.status(404).json({ success: false, message: 'Food not found' });
    const randomIndex = Math.floor(Math.random() * foods.length);
    res.json({ success: true, data: foods[randomIndex] });
});

// GET /api/foods/:id
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
    res.json({ success: true, data: food });
});

module.exports = router;
