import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/user-store';
import { useProducts } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, LogOut, ShoppingBag, Heart, Clock, Settings } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import OrderTracking from '@/components/OrderTracking';

const Profile = () => {
  const { user, isAuthenticated, logout } = useUser();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Get user's favorite products
  const favoriteProducts = products.filter(
    product => user?.favorites.includes(product.id)
  );

  // Sample order for demonstration
  const sampleOrder = {
    id: "order-123456",
    userId: "user-1",
    items: [],
    totalPrice: 5999,
    status: "shipped" as const,
    trackingNumber: "RU123456789",
    trackingUrl: "https://pochta.ru/tracking",
    createdAt: new Date().toISOString()
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-6">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-autoblue-light flex items-center justify-center mb-4">
                      <UserRound size={48} className="text-white" />
                    </div>
                  )}
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/orders')}
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Мои заказы
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/history')}
                  >
                    <Clock size={18} className="mr-2" />
                    История просмотров
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings size={18} className="mr-2" />
                    Настройки
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
                    onClick={logout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Выйти
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="profile" className="flex-1">Профиль</TabsTrigger>
                    <TabsTrigger value="orders" className="flex-1">Заказы</TabsTrigger>
                    <TabsTrigger value="favorites" className="flex-1">Избранное</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <h3 className="text-xl font-bold mb-4">Личные данные</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input 
                          id="phone" 
                          placeholder="+7 (___) ___-__-__" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="mt-4">
                        <Button>Сохранить изменения</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <h3 className="text-xl font-bold mb-4">История заказов</h3>
                    <div className="mb-6">
                      <OrderTracking order={sampleOrder} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="favorites">
                    <h3 className="text-xl font-bold mb-4">Избранные товары</h3>
                    {favoriteProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favoriteProducts.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Heart size={48} className="mx-auto mb-4 text-gray-400" />
                        <p>У вас пока нет избранных товаров</p>
                        <p className="text-sm mt-2">Добавляйте товары в избранное, чтобы вернуться к ним позже</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
