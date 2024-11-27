import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { state, dispatch } = useCart();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const cartItemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleSort = (sortOption: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sortOption);
    setSearchParams(newParams);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6 dark:text-white" />
              </button>
              <div className="flex items-center ml-4">
                <span 
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold text-green-600 dark:text-green-500 cursor-pointer"
                >
                  FreshCart
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search for groceries..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={searchParams.get('sort') || 'Featured'}
                onChange={(e) => handleSort(e.target.value)}
                className="rounded-lg border-gray-300 text-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
              </select>

              <div className="relative">
                <button
                  onClick={() => user ? logout() : setIsAuthModalOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <User className="h-6 w-6 dark:text-white" />
                  {user && <span className="text-sm dark:text-white">{user.name}</span>}
                </button>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              >
                <ShoppingCart className="h-6 w-6 dark:text-white" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs font-bold rounded-full bg-green-500 text-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}