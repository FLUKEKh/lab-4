const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // Filtering logic
        if (search) {
            const keyword = search.toLowerCase();
            foods = foods.filter(f => 
                f.name.toLowerCase().includes(keyword) || 
                (f.description && f.description.toLowerCase().includes(keyword))
            );
        }

        if (category) {
            foods = foods.filter(f => f.category === category);
        }

        if (maxSpicy) {
            const max = parseInt(maxSpicy);
            foods = foods.filter(f => f.spicy <= max);
        }

        if (vegetarian === 'true') {
            foods = foods.filter(f => f.vegetarian === true);
        } else if (vegetarian === 'false') {
            foods = foods.filter(f => f.vegetarian === false);
        }

        if (available === 'true') {
            foods = foods.filter(f => f.available === true);
        } else if (available === 'false') {
            foods = foods.filter(f => f.available === false);
        }

        if (maxPrice) {
            const priceLimit = parseFloat(maxPrice);
            foods = foods.filter(f => f.price <= priceLimit);
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
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const id = parseInt(req.params.id);
    const food = foods.find(f => f.id === id);
    if (food) {
        res.json({ success: true, data: food });
    } else {
        res.status(404).json({ success: false, message: 'Food not found' });
    }
});

// GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category;
    const filtered = foods.filter(f => f.category === category);
    res.json({ success: true, data: filtered, total: filtered.length });
});

// GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) {
        return res.status(404).json({ success: false, message: 'No foods available' });
    }
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    res.json({ success: true, data: randomFood });
});

module.exports = router;