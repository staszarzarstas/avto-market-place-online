import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { useProducts } from '@/lib/store';
import { Product } from '@/lib/types';

interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar = ({ initialQuery = '' }: SearchBarProps) => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Debounced search function
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length > 1) {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const filteredProducts = products
        .filter(product => {
          const nameMatch = searchTerms.some(term => 
            product.name.toLowerCase().includes(term)
          );
          
          const categoryMatch = searchTerms.some(term => 
            product.category.toLowerCase().includes(term)
          );
          
          return nameMatch || categoryMatch;
        })
        .slice(0, 8);
      
      setSuggestions(filteredProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [products]);

  // Handle search query changes with debounce
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(query);
    }, 150); // 150ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (productId: number) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
  };

  // Group suggestions by category
  const groupedSuggestions: Record<string, Product[]> = suggestions.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Поиск товаров..."
            className="w-full pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3 text-gray-500"
          >
            <Search size={18} />
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <Command
          className="absolute left-0 right-0 top-full mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg z-[9999]"
        >
          <CommandList className="max-h-[800px] w-full overflow-y-auto p-4">
            {Object.entries(groupedSuggestions).map(([category, products]) => (
              <CommandGroup key={category} heading={category} className="py-4">
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelectSuggestion(product.id)}
                    className="flex items-center gap-5 py-5 px-4 cursor-pointer hover:bg-gray-50 rounded-md mb-2"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-20 w-20 rounded-md object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-lg">{product.name}</span>
                      <span className="text-base text-gray-500">{product.price.toLocaleString()} ₽</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      )}
    </div>
  );
};

export default SearchBar;
