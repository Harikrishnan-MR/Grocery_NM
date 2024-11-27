import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  showOriginalPrice?: boolean;
}

export default function ProductCard({ product, showOriginalPrice }: ProductCardProps) {
  const { dispatch: cartDispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();

  const isFavorite = favoritesState.items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartDispatch({ type: 'ADD_ITEM', payload: product });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      favoritesDispatch({ type: 'REMOVE_FAVORITE', payload: product.id });
    } else {
      favoritesDispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-md ${
              isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.unit}</p>
        <div className="flex justify-between items-center">
          <div>
            {showOriginalPrice && 'originalPrice' in product && (
              <p className="text-sm text-gray-500 line-through">
                ₹{(product as any).originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{product.price.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stock: {product.stock}
          </p>
        </div>
      </div>
    </Link>
  );
}