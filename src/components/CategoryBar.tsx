import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Apple, Beef, Carrot, Egg, Fish, Milk } from 'lucide-react';

const categories = [
  { id: '1', name: 'All Categories', icon: Apple },
  { id: '2', name: 'Fruits', icon: Apple },
  { id: '3', name: 'Vegetables', icon: Carrot },
  { id: '4', name: 'Meat', icon: Beef },
  { id: '5', name: 'Seafood', icon: Fish },
  { id: '6', name: 'Dairy', icon: Milk },
  { id: '7', name: 'Eggs', icon: Egg },
];

export default function CategoryBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All Categories';

  const handleCategorySelect = (categoryName: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', categoryName);
    navigate(`/?${newParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className={`flex flex-col items-center min-w-[4rem] space-y-1 transition-colors ${
                  selectedCategory === category.name
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  selectedCategory === category.name
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}