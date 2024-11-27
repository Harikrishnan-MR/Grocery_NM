import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { dispatch } = useCart();

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">per {product.unit}</p>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Stock: {product.stock} {product.unit}s available
            </p>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}