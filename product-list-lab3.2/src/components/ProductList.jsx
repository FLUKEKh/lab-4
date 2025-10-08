import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        if (sortBy === 'price') {
            result = result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'name') {
            result = result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'rating') {
            result = result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="product-list-container">
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - การสร้าง Components และ Props</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <div>
                    <label>หมวดหมู่: </label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>

                <div>
                    <label>ค้นหา: </label>
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="ชื่อหรือคำอธิบาย"
                    />
                </div>

                <div>
                    <label>เรียงลำดับ: </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">-- เลือก --</option>
                        <option value="name">ชื่อ</option>
                        <option value="price">ราคา</option>
                        <option value="rating">คะแนน</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onViewDetails={onViewDetails}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>
                        😢 ไม่พบสินค้า
                    </p>
                )}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductList;
