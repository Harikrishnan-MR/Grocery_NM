import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import CartSidebar from './components/CartSidebar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <Sidebar 
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
                <CategoryBar />
                
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                </Routes>

                <CartSidebar />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;