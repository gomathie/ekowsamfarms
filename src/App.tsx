import React, { useState } from 'react';
import { PageId, Product, CartItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { PoultryCalculatorModal } from './components/PoultryCalculatorModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DivisionsPage } from './pages/DivisionsPage';
import { StorePage } from './pages/StorePage';
import { TrainingPage } from './pages/TrainingPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [poultryCalculatorOpen, setPoultryCalculatorOpen] = useState(false);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        openCart={() => setCartDrawerOpen(true)}
        openAIAssistant={() => setAiAssistantOpen(true)}
        openPoultryCalculator={() => setPoultryCalculatorOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            openAIAssistant={() => setAiAssistantOpen(true)}
            openPoultryCalculator={() => setPoultryCalculatorOpen(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'divisions' && (
          <DivisionsPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'store' && (
          <StorePage
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            openCart={() => setCartDrawerOpen(true)}
          />
        )}
        {currentPage === 'training' && (
          <TrainingPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'blog' && (
          <BlogPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'contact' && (
          <ContactPage setCurrentPage={setCurrentPage} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* AI Farm Advisor Modal */}
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Poultry Batch & Yield Calculator Modal */}
      <PoultryCalculatorModal
        isOpen={poultryCalculatorOpen}
        onClose={() => setPoultryCalculatorOpen(false)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
