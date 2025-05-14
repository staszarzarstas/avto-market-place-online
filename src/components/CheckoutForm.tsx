import React, { useState } from 'react';
import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CheckoutFormProps {
  onSuccess: () => void;
}

const CheckoutForm = ({ onSuccess }: CheckoutFormProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Имитация задержки обработки заказа
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Создаем объект заказа
      const order = {
        orderId: Date.now().toString(),
        customerInfo: formData,
        items: items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: totalPrice,
        orderDate: new Date().toLocaleString()
      };

      // Сохраняем заказ в localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Очищаем корзину и показываем уведомление
      clearCart();
      toast.success('Заказ успешно оформлен!');
      onSuccess();
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium mb-2">
          Ваше имя
        </label>
        <Input
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          required
          placeholder="Введите ваш email"
        />
      </div>

      <div>
        <label htmlFor="customerPhone" className="block text-sm font-medium mb-2">
          Телефон
        </label>
        <Input
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          required
          placeholder="Введите номер телефона"
        />
      </div>

      <div>
        <label htmlFor="deliveryAddress" className="block text-sm font-medium mb-2">
          Адрес доставки
        </label>
        <Textarea
          id="deliveryAddress"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          placeholder="Введите адрес доставки"
          rows={3}
        />
      </div>

      <div className="pt-4 border-t">
        <div className="mb-4 flex justify-between">
          <span className="text-lg">Итого к оплате:</span>
          <span className="text-xl font-bold">{totalPrice.toLocaleString()} ₽</span>
        </div>

        <Button
          type="submit"
          className="w-full bg-autored hover:bg-autored-dark text-white py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Оформление заказа...' : 'Оформить заказ'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm; 