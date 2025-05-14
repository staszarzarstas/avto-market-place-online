import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

const Favorites = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Получаем избранные товары из localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} успешно добавлен в корзину`,
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-autogray mb-4">
                <Heart size={32} className="text-autoblue" />
              </div>
              <h2 className="text-2xl font-bold mb-4">В избранном пока ничего нет</h2>
              <p className="text-gray-600 mb-8">
                Добавляйте товары в избранное, чтобы не потерять их
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
          <h1 className="text-3xl font-bold mb-8">Избранные товары</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{product.price.toLocaleString()} ₽</span>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-autoblue hover:bg-autoblue-light"
                    >
                      В корзину
                    </Button>
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

export default Favorites; 