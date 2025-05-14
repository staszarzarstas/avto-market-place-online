import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-autoblue text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-autored transform -skew-x-12"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Преобразите свой автомобиль с нашими аксессуарами
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Широкий выбор качественных автоаксессуаров для комфорта, 
              безопасности и стиля. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-autored hover:bg-autored-dark border-none">
                <Link to="/catalog">
                  Каталог товаров
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-autored hover:bg-autored-dark text-white border-none">
                <Link to="/about">О компании</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-autoblue-light to-autoblue-dark shadow-xl">
              {/* Placeholder for hero image */}
              <div className="w-full h-full flex items-center justify-center bg-autoblue-light">
                <img 
                  src="https://cdn1.ozonusercontent.com/s3/product-service-meta-media/853cb75e-1013-44c6-aa84-2cb8ef906113.jpg" 
                  alt="Автоаксессуары" 
                  className="w-[70%] h-[70%] object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
