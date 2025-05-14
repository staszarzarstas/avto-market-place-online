
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/lib/store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded mb-4 sm:mb-0 mr-0 sm:mr-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="font-bold text-autoblue">{product.price.toLocaleString()} ₽</p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded mr-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecreaseQuantity}
            className="h-8 w-8 text-gray-600 hover:text-autoblue"
          >
            <Minus size={16} />
          </Button>
          <span className="px-2 py-1 min-w-[30px] text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncreaseQuantity}
            className="h-8 w-8 text-gray-600 hover:text-autoblue"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-gray-400 hover:text-autored"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
