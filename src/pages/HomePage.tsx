import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { Product } from '../types';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All Categories';
  const sortBy = searchParams.get('sort') || 'Featured';
  const query = searchParams.get('q') || '';

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All Categories' || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Name: A to Z':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {query ? 'Search Results' : category === 'All Categories' ? 'Featured Products' : category}
        </h2>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={setSelectedProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}