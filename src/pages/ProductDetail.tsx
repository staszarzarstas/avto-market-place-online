import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, Package, Shield, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useProducts, useCart } from '@/lib/store';
import { useUser } from '@/lib/user-store';
import ProductCard from '@/components/ProductCard';
import ProductReviews from '@/components/ProductReviews';
import OrderTracking from '@/components/OrderTracking';
import { Review } from '@/lib/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Find the current product
  const product = products.find(p => p.id === parseInt(id || '0'));
  
  // Related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  // Load saved reviews from localStorage on initial render
  useEffect(() => {
    if (product) {
      const savedReviews = localStorage.getItem(`product-reviews-${product.id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }

      // Добавляем товар в историю просмотров
      const viewHistory = JSON.parse(localStorage.getItem('viewHistory') || '[]');
      const existingIndex = viewHistory.findIndex((item: any) => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Если товар уже есть в истории, удаляем его
        viewHistory.splice(existingIndex, 1);
      }
      
      // Добавляем товар в начало истории
      viewHistory.unshift({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        description: product.description,
        viewedAt: new Date().toISOString()
      });
      
      // Ограничиваем историю 20 последними просмотрами
      const limitedHistory = viewHistory.slice(0, 20);
      localStorage.setItem('viewHistory', JSON.stringify(limitedHistory));
    }
  }, [product]);
  
  // Handler for adding new reviews
  const handleAddReview = (newReview: Review) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    
    // Save to localStorage
    if (product) {
      localStorage.setItem(`product-reviews-${product.id}`, JSON.stringify(updatedReviews));
    }
  };

  // Sample order for demonstration
  const sampleOrder = {
    id: "order-123456",
    userId: "user-1",
    items: [],
    totalPrice: 0,
    status: "shipped" as const,
    trackingNumber: "RU123456789",
    trackingUrl: "https://pochta.ru/tracking",
    createdAt: new Date().toISOString()
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <Button 
            variant="outline"
            onClick={() => navigate('/catalog')}
            className="mb-8"
          >
            <ArrowLeft size={18} className="mr-2" />
            Вернуться в каталог
          </Button>
          
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <p className="text-gray-600 mb-8">
              К сожалению, запрашиваемый товар не существует или был удален.
            </p>
            <Button 
              onClick={() => navigate('/catalog')} 
              className="bg-autoblue hover:bg-autoblue-light"
            >
              Перейти в каталог
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Display stars based on rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
      </div>
    );
  };

  const favorite = isFavorite(product.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray">
        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline"
            onClick={() => navigate('/catalog')}
            className="mb-8"
          >
            <ArrowLeft size={18} className="mr-2" />
            Вернуться в каталог
          </Button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="inline-block bg-autogray text-autoblue text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="inline-block bg-autored text-white text-sm px-3 py-1 rounded-full ml-2">
                      Хит продаж
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="mb-4">
                  {renderRating()}
                </div>
                
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-autoblue mb-2">
                    {product.price.toLocaleString()} ₽
                  </h2>
                  <p className="text-green-600 font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    В наличии
                  </p>
                </div>
                
                <div className="mb-8">
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => addItem(product)}
                    className="bg-autored hover:bg-autored-dark text-white font-bold py-3 px-6 rounded-lg text-lg flex-grow"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(product.id)}
                    className={`rounded-lg ${favorite ? 'border-red-300 bg-red-50 hover:bg-red-100' : ''}`}
                  >
                    <Heart
                      size={20}
                      className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}
                    />
                  </Button>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <div className="mr-3 text-autoblue">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Бесплатная доставка</h3>
                        <p className="text-xs text-gray-600">При заказе от 5000 ₽</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 text-autoblue">
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Возврат и обмен</h3>
                        <p className="text-xs text-gray-600">14 дней на возврат</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 text-autoblue">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Гарантия качества</h3>
                        <p className="text-xs text-gray-600">12 месяцев гарантии</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Tracking (Demo) */}
          <div className="mt-8">
            <OrderTracking order={sampleOrder} />
          </div>
          
          {/* Product Reviews */}
          <ProductReviews 
            productId={product.id} 
            initialReviews={reviews}
            onAddReview={handleAddReview}
          />
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
