
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';

const Catalog = () => {
  const location = useLocation();
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get URL params
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if provided
    if (categoryParam) {
      result = result.filter(product => product.category === categoryParam);
    }
    
    // Filter by search term if provided
    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(result);
  }, [categoryParam, searchParam, products]);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray">
        {/* Page Header */}
        <div className="bg-autoblue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Каталог автоаксессуаров</h1>
            <SearchBar />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button onClick={toggleFilter} variant="outline" className="w-full flex items-center justify-center">
                <Filter size={18} className="mr-2" />
                {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
              </Button>
            </div>
            
            {/* Sidebar Filters */}
            <div className={`md:w-1/4 lg:w-1/5 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Фильтры</h2>
                  <SlidersHorizontal size={18} className="text-gray-400" />
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Категории</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="all-categories" 
                        name="category" 
                        checked={!categoryParam} 
                        onChange={() => window.location.href = '/catalog'} 
                        className="mr-2"
                      />
                      <label htmlFor="all-categories" className="text-sm">Все категории</label>
                    </div>
                    
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`category-${index}`} 
                          name="category" 
                          checked={category === categoryParam}
                          onChange={() => window.location.href = `/catalog?category=${encodeURIComponent(category)}`}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${index}`} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Results Summary */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {filteredProducts.length} товаров
                    {categoryParam && ` в категории "${categoryParam}"`}
                    {searchParam && ` по запросу "${searchParam}"`}
                  </h2>
                </div>
                
                <div className="mt-3 sm:mt-0">
                  <select className="border rounded px-3 py-2 bg-white text-sm">
                    <option>По популярности</option>
                    <option>По убыванию цены</option>
                    <option>По возрастанию цены</option>
                    <option>По рейтингу</option>
                  </select>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">Товары не найдены</h3>
                  <p className="text-gray-600 mb-4">
                    К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/catalog'} 
                    className="bg-autoblue hover:bg-autoblue-light"
                  >
                    Показать все товары
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
