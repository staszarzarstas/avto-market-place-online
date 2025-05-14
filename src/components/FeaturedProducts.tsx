
import React from 'react';
import { useProducts } from '@/lib/store';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-12 bg-autogray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-autoblue">Популярные</span> <span className="text-autored">товары</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
