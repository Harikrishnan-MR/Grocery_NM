import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);
  const isFavorite = favoritesState.items.some(item => item.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesDispatch({ type: 'REMOVE_FAVORITE', payload: product.id });
    } else {
      favoritesDispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
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
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <Heart className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="text-gray-500 dark:text-gray-400 mt-4">{product.description}</p>
          
          <div className="mt-6">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{product.price.toFixed(2)}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                per {product.unit}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Stock: {product.stock} {product.unit}s available
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}