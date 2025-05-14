
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { useProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const { products } = useProducts();
  const [results, setResults] = useState<Product[]>([]);
  
  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    // Perform search with advanced matching
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const searchResults = products.filter(product => {
      const nameMatch = searchTerms.some(term => 
        product.name.toLowerCase().includes(term)
      );
      
      const descriptionMatch = searchTerms.some(term => 
        product.description.toLowerCase().includes(term)
      );
      
      const categoryMatch = searchTerms.some(term => 
        product.category.toLowerCase().includes(term)
      );
      
      return nameMatch || descriptionMatch || categoryMatch;
    });
    
    setResults(searchResults);
  }, [query, products]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray">
        {/* Search Header */}
        <div className="bg-autoblue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Результаты поиска</h1>
            <SearchBar initialQuery={query} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Results Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              {results.length 
                ? `Найдено ${results.length} товаров по запросу "${query}"`
                : `По запросу "${query}" ничего не найдено`
              }
            </h2>
          </div>
          
          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Товары не найдены</h3>
              <p className="text-gray-600 mb-4">
                К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос или просмотреть наш каталог.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
