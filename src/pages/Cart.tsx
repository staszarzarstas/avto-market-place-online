
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';

const Cart = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Корзина</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ShoppingCart />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
