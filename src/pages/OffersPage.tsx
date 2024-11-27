import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { Product } from '../types';

// Simulate discounted products
const discountedProducts = products.map(product => ({
  ...product,
  originalPrice: product.price,
  price: Number((product.price * 0.8).toFixed(2)), // 20% discount
  discount: 20
})).slice(0, 4); // Only show first 4 products as discounted

export default function OffersPage() {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Special Offers & Discounts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {discountedProducts.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md z-10">
              {product.discount}% OFF
            </div>
            <ProductCard
              product={product}
              onProductClick={setSelectedProduct}
              showOriginalPrice
            />
          </div>
        ))}
      </div>
    </div>
  );
}