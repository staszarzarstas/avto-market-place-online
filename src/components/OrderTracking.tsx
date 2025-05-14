
import React from 'react';
import { Package } from 'lucide-react';
import { Order } from '@/lib/types';

interface OrderTrackingProps {
  order: Order;
}

const OrderTracking = ({ order }: OrderTrackingProps) => {
  // Helper function to get status color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper function to get status label
  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      default:
        return 'Неизвестно';
    }
  };

  // Generate tracking steps based on status
  const trackingSteps = [
    { id: 1, name: 'Заказ оформлен', completed: true },
    { id: 2, name: 'Заказ подтвержден', completed: true },
    { id: 3, name: 'Передан в службу доставки', completed: order.status !== 'pending' },
    { id: 4, name: 'В пути', completed: order.status === 'shipped' || order.status === 'delivered' },
    { id: 5, name: 'Доставлен', completed: order.status === 'delivered' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Package className="mr-2" size={24} />
          Отслеживание заказа
        </h2>
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(order.status)} mr-2`}></span>
          <span className="font-medium">{getStatusLabel(order.status)}</span>
        </div>
      </div>

      {order.trackingNumber && (
        <div className="mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Номер отслеживания:</p>
              <p className="text-lg font-medium">{order.trackingNumber}</p>
            </div>
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-autoblue text-white px-4 py-2 rounded-md hover:bg-autoblue-light transition-colors text-sm"
              >
                Отследить на сайте перевозчика
              </a>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="overflow-hidden h-2 flex rounded bg-gray-200">
          <div 
            className="bg-autoblue transition-all duration-500"
            style={{ 
              width: `${(trackingSteps.filter(step => step.completed).length / trackingSteps.length) * 100}%` 
            }}
          ></div>
        </div>
        
        {/* Tracking steps */}
        <div className="mt-6">
          <ol className="space-y-6">
            {trackingSteps.map((step) => (
              <li key={step.id} className="flex items-start">
                <div 
                  className={`flex-shrink-0 w-6 h-6 rounded-full mt-1 mr-3 flex items-center justify-center 
                    ${step.completed ? 'bg-autoblue text-white' : 'bg-gray-200'}`
                  }
                >
                  {step.completed && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.name}
                  </h3>
                  {step.id === 3 && order.status !== 'pending' && (
                    <p className="text-sm text-gray-600">
                      {order.trackingNumber ? `Трек-номер: ${order.trackingNumber}` : 'Отправлен в доставку'}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
