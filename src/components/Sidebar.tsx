import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Tag, Heart, Clock, Sun, Moon, Apple, Carrot, 
  Beef, Fish, Milk, Cookie, Cake, ShoppingBag, Sandwich 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { icon: Apple, label: 'Fruits', category: 'Fruits' },
  { icon: Carrot, label: 'Vegetables', category: 'Vegetables' },
  { icon: Beef, label: 'Meat', category: 'Meat' },
  { icon: Fish, label: 'Seafood', category: 'Seafood' },
  { icon: Milk, label: 'Dairy', category: 'Dairy' },
  { icon: Sandwich, label: 'Bakery', category: 'Bakery' },
  { icon: Cookie, label: 'Snacks', category: 'Snacks' },
  { icon: Cake, label: 'Sweets', category: 'Sweets' },
  { icon: ShoppingBag, label: 'Grocery', category: 'Grocery' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', action: () => navigate('/') },
    { icon: Tag, label: 'Offers & Discounts', action: () => navigate('/offers') },
    { icon: Heart, label: 'Favorites', action: () => navigate('/favorites') },
    { icon: Clock, label: 'Order History', action: () => navigate('/orders') },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto">
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
          </div>

          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categories
              </h3>
              <ul className="mt-2 space-y-2">
                {categories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => {
                          navigate(`/?category=${item.category}`);
                          onClose();
                        }}
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="border-t dark:border-gray-700 px-4 py-4">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}