
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { useUser } from '@/lib/user-store';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useUser();
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };
  
  // Display stars based on rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />);
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
      </div>
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="outline"
              className={`rounded-full ${favorite ? 'bg-red-100 border-red-300 hover:bg-red-200' : 'bg-white/70 backdrop-blur-sm hover:bg-white'}`}
              onClick={handleToggleFavorite}
            >
              <Heart 
                size={18} 
                className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
              />
            </Button>
          </div>
          {product.featured && (
            <span className="absolute top-2 left-2 bg-autored text-white text-xs px-2 py-1 rounded">
              Хит продаж
            </span>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-autored transition-colors">
              {product.name}
            </h3>
            <div className="mb-2">
              {renderRating()}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-autoblue">
              {product.price.toLocaleString()} ₽
            </p>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-autoblue hover:bg-autoblue-light text-white"
            >
              <ShoppingCart size={16} className="mr-1" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
