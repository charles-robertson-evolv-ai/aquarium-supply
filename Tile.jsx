
import React from 'react';
import './Tile.css';

// Tank configurations
const TANKS = [
  { size: 'Small', capacity: 4000, name: 'Small 4000L' },
  { size: 'Medium', capacity: 80000, name: 'Medium 80000L' },
  { size: 'Large', capacity: 1600000, name: 'Large 1600000L' },
  { size: 'Humongous', capacity: 32000000, name: 'Humongous 32000000L' }
];

// Product categories with size requirements
const PRODUCTS = {
  animals: [
    { name: 'Goldfish', price: 15, minTankSize: 'Small' },
    { name: 'Betta Fish', price: 25, minTankSize: 'Small' },
    { name: 'Neon Tetras (5)', price: 40, minTankSize: 'Small' },
    { name: 'Angel Fish', price: 65, minTankSize: 'Medium' },
    { name: 'Discus Fish', price: 120, minTankSize: 'Medium' },
    { name: 'Oscar Fish', price: 85, minTankSize: 'Large' },
    { name: 'Arowana', price: 500, minTankSize: 'Large' },
    { name: 'Shark', price: 2500, minTankSize: 'Humongous' }
  ],
  scenery: [
    { name: 'Small Rock', price: 12, minTankSize: 'Small' },
    { name: 'Plastic Plants', price: 20, minTankSize: 'Small' },
    { name: 'Driftwood Piece', price: 35, minTankSize: 'Small' },
    { name: 'Medium Cave', price: 55, minTankSize: 'Medium' },
    { name: 'Coral Decoration', price: 75, minTankSize: 'Medium' },
    { name: 'Large Castle', price: 120, minTankSize: 'Large' },
    { name: 'Sunken Ship', price: 200, minTankSize: 'Large' },
    { name: 'Giant Rock Formation', price: 450, minTankSize: 'Humongous' }
  ],
  insurance: [
    { name: 'Basic Tank Insurance', price: 50, minTankSize: 'Small' },
    { name: 'Premium Tank Insurance', price: 100, minTankSize: 'Small' },
    { name: 'Animal Life Insurance', price: 75, minTankSize: 'Small' },
    { name: 'Comprehensive Coverage', price: 200, minTankSize: 'Small' },
    { name: 'Disaster Protection', price: 300, minTankSize: 'Medium' },
    { name: 'Professional Aquarium Insurance', price: 500, minTankSize: 'Large' }
  ]
};

const TANK_SIZE_ORDER = ['Small', 'Medium', 'Large', 'Humongous'];

export default function Tile({ id, tank, products, onDelete, onUpdateTank }) {
  const tankConfig = TANKS.find(t => t.size === tank.size);
  const tankPrice = Math.round(tankConfig.capacity * 1.25);

  const getCompatibleProducts = (category) => {
    const tankIndex = TANK_SIZE_ORDER.indexOf(tank.size);
    return PRODUCTS[category].filter(product => {
      const productIndex = TANK_SIZE_ORDER.indexOf(product.minTankSize);
      return productIndex <= tankIndex;
    });
  };

  const addRandomProduct = () => {
    const categories = ['animals', 'scenery', 'insurance'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Check if insurance already exists and skip if trying to add another
    if (randomCategory === 'insurance' && products.some(p => p.category === 'insurance')) {
      // Try again with a different category
      const nonInsuranceCategories = ['animals', 'scenery'];
      const fallbackCategory = nonInsuranceCategories[Math.floor(Math.random() * nonInsuranceCategories.length)];
      const compatibleProducts = getCompatibleProducts(fallbackCategory);
      
      if (compatibleProducts.length > 0) {
        const randomProduct = compatibleProducts[Math.floor(Math.random() * compatibleProducts.length)];
        const newProduct = {
          id: Date.now(),
          category: fallbackCategory,
          ...randomProduct
        };
        
        const updatedProducts = [...products, newProduct];
        onUpdateTank(id, { tank, products: updatedProducts });
      }
      return;
    }
    
    const compatibleProducts = getCompatibleProducts(randomCategory);
    
    if (compatibleProducts.length > 0) {
      const randomProduct = compatibleProducts[Math.floor(Math.random() * compatibleProducts.length)];
      const newProduct = {
        id: Date.now(),
        category: randomCategory,
        ...randomProduct
      };
      
      const updatedProducts = [...products, newProduct];
      onUpdateTank(id, { tank, products: updatedProducts });
    }
  };

  const randomizeAll = () => {
    // Keep tank, randomize products
    const newProducts = [];
    const numProducts = Math.floor(Math.random() * 8) + 2; // 2-9 products
    let hasInsurance = false;
    
    for (let i = 0; i < numProducts; i++) {
      let categories = ['animals', 'scenery', 'insurance'];
      
      // Remove insurance from options if we already have one
      if (hasInsurance) {
        categories = ['animals', 'scenery'];
      }
      
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const compatibleProducts = getCompatibleProducts(randomCategory);
      
      if (compatibleProducts.length > 0) {
        const randomProduct = compatibleProducts[Math.floor(Math.random() * compatibleProducts.length)];
        newProducts.push({
          id: Date.now() + i,
          category: randomCategory,
          ...randomProduct
        });
        
        // Mark that we have insurance
        if (randomCategory === 'insurance') {
          hasInsurance = true;
        }
      }
    }
    
    onUpdateTank(id, { tank, products: newProducts });
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    onUpdateTank(id, { tank, products: updatedProducts });
  };

  return (
    <div className="tile">
      <div className="tile-header">
        <h3 className="tile-title">Tank #{id}</h3>
        <div className="tile-controls">
          <button className="control-button add-button" onClick={addRandomProduct} aria-label="Add random product">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button className="control-button randomize-button" onClick={randomizeAll} aria-label="Randomize all products">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23,4 23,10 17,10"></polyline>
              <polyline points="1,20 1,14 7,14"></polyline>
              <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4-4.64,4.36A9,9,0,0,1,3.51,15"></path>
            </svg>
          </button>
          <button className="control-button delete-button" onClick={() => onDelete(id)} aria-label="Delete tank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="products-table">
        <div className="product-row tank-row">
          <div className="col-item">{tankConfig.name} tank</div>
          <div className="col-price">${tankPrice}</div>
        </div>
        
        {products.map(product => (
          <div key={product.id} className="product-row">
            <div className="col-item">
              {product.name}
              <button 
                className="remove-product" 
                onClick={() => removeProduct(product.id)}
                aria-label="Remove product"
              >
                ×
              </button>
            </div>
            <div className="col-price">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
