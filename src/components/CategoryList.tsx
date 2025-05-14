
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/lib/store';

const CategoryList = () => {
  const { products } = useProducts();
  
  // Get unique categories and count products in each
  const categories = products.reduce((acc: {id: number, name: string, count: number, imageUrl: string}[], product) => {
    const existingCategory = acc.find(cat => cat.name === product.category);
    
    if (existingCategory) {
      existingCategory.count += 1;
    } else {
      acc.push({
        id: acc.length + 1,
        name: product.category,
        count: 1,
        imageUrl: '/placeholder.svg'
      });
    }
    
    return acc;
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-autoblue">Категории</span> <span className="text-autored">товаров</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-autogray rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg relative">
                <div className="bg-gradient-to-r from-autoblue to-autoblue-light p-6 h-40 flex items-center justify-center relative">
                  <div className="text-center z-10">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80">{category.count} товаров</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
