import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800',
    category: 'Fruits',
    description: 'Fresh organic bananas from Ecuador, perfect for smoothies or as a healthy snack.',
    unit: 'bunch',
    stock: 50
  },
  {
    id: '2',
    name: 'Fresh Avocados',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800',
    category: 'Fruits',
    description: 'Ripe and ready to eat avocados. Perfect for guacamole or sandwiches.',
    unit: 'piece',
    stock: 30
  },
  {
    id: '3',
    name: 'Organic Tomatoes',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    category: 'Vegetables',
    description: 'Locally grown organic tomatoes. Sweet and juicy, ideal for salads.',
    unit: 'lb',
    stock: 40
  },
  {
    id: '4',
    name: 'Fresh Milk',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800',
    category: 'Dairy',
    description: 'Fresh whole milk from local farms. Rich in calcium.',
    unit: 'gallon',
    stock: 25
  },
  {
    id: '5',
    name: 'Organic Eggs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800',
    category: 'Eggs',
    description: 'Farm fresh organic eggs from free-range chickens.',
    unit: 'dozen',
    stock: 35
  },
  {
    id: '6',
    name: 'Atlantic Salmon',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&q=80&w=800',
    category: 'Seafood',
    description: 'Fresh Atlantic salmon fillet. Rich in omega-3.',
    unit: 'lb',
    stock: 20
  },
  {
    id: '7',
    name: 'Ground Beef',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=800',
    category: 'Meat',
    description: 'Fresh ground beef, perfect for burgers and meatballs.',
    unit: 'lb',
    stock: 30
  },
  {
    id: '8',
    name: 'Chicken Breast',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800',
    category: 'Meat',
    description: 'Boneless, skinless chicken breast. High in protein.',
    unit: 'lb',
    stock: 40
  }
];