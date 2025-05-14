import React, { useState } from 'react';
import { useCart } from '@/lib/store';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart as CartIcon } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

const ShoppingCart = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-autogray mb-4">
          <CartIcon size={32} className="text-autoblue" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
        <p className="text-gray-600 mb-8">
          Похоже, вы еще не добавили товары в свою корзину
        </p>
        <Button asChild className="bg-autoblue hover:bg-autoblue-light">
          <Link to="/catalog">Начать покупки</Link>
        </Button>
      </div>
    );
  }
  
  if (isCheckout) {
    return (
      <div>
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setIsCheckout(false)}
            className="text-autoblue hover:text-autoblue-light"
          >
            ← Вернуться в корзину
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
          <CheckoutForm onSuccess={() => setIsCheckout(false)} />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Корзина ({items.length})</h2>
        <Button 
          variant="outline" 
          onClick={clearCart}
          className="text-autored border-autored hover:bg-autored hover:text-white"
        >
          Очистить корзину
        </Button>
      </div>
      
      <div className="border-t border-gray-200">
        {items.map(item => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-autogray rounded-lg">
        <div className="mb-4 flex justify-between">
          <span>Итого:</span>
          <span className="text-xl font-bold">{totalPrice.toLocaleString()} ₽</span>
        </div>
        
        <Button 
          className="w-full bg-autored hover:bg-autored-dark text-white py-2"
          onClick={() => setIsCheckout(true)}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
