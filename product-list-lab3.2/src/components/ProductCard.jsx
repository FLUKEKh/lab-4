import React from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';

function ProductCard({ product, onAddToCart, onViewDetails }) {

    // ฟังก์ชันแสดงดาว
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) stars.push('★');
        if (halfStar) stars.push('☆');
        while (stars.length < 5) stars.push('☆');
        return stars.join('');
    };

    return (
        <div 
            className="product-card" 
            data-status={product.inStock ? 'In Stock' : 'หมดสินค้า'}
        >
            <div className="product-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300/cccccc/666666?text=No+Image';
                    }}
                />
                {product.discount > 0 && (
                    <div className="discount-badge">
                        ลด {product.discount}%
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                {/* Star Rating */}
                <div className="product-rating">
                    {renderStars(product.rating)} ({product.rating.toFixed(1)})
                </div>

                {/* Price */}
                <div className="product-price">
                    ฿{product.price.toLocaleString()}
                    {product.discount > 0 && (
                        <span className="line-through">฿{product.originalPrice.toLocaleString()}</span>
                    )}
                </div>

                <div className="product-actions">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// PropTypes
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        discount: PropTypes.number,
        image: PropTypes.string,
        description: PropTypes.string,
        inStock: PropTypes.bool,
        rating: PropTypes.number
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;
