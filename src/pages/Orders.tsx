import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

interface Order {
  orderId: string;
  customerInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderDate: string;
}

const Orders = () => {
  // Получаем заказы из localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-autogray mb-4">
                <Package size={32} className="text-autoblue" />
              </div>
              <h2 className="text-2xl font-bold mb-4">У вас пока нет заказов</h2>
              <p className="text-gray-600 mb-8">
                После оформления заказа вы сможете увидеть его здесь
              </p>
              <Button asChild className="bg-autoblue hover:bg-autoblue-light">
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Заказ #{order.orderId}</h3>
                    <p className="text-gray-600">{order.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{order.totalAmount.toLocaleString()} ₽</p>
                    <p className="text-sm text-gray-600">{order.items.length} товаров</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">Информация о доставке:</h4>
                  <p className="text-gray-600 mb-1">{order.customerInfo.customerName}</p>
                  <p className="text-gray-600 mb-1">{order.customerInfo.customerPhone}</p>
                  <p className="text-gray-600">{order.customerInfo.deliveryAddress}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-medium mb-2">Товары в заказе:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders; 