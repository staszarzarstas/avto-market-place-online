
import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/lib/user-store';
import { Review } from '@/lib/types';

interface ProductReviewsProps {
  productId: number;
  initialReviews?: Review[];
  onAddReview: (review: Review) => void;
}

const ProductReviews = ({ productId, initialReviews = [], onAddReview }: ProductReviewsProps) => {
  const { user, isAuthenticated } = useUser();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleAddReview = () => {
    if (!user || comment.trim() === '') return;

    const newReview: Review = {
      id: Date.now(),
      productId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // Update local state
    setReviews([...reviews, newReview]);
    
    // Call parent handler
    onAddReview(newReview);
    
    // Reset form
    setComment('');
    setRating(5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Render stars for a given rating
  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          size={interactive ? 24 : 16} 
          className={`${i <= (interactive ? (hoveredStar || rating) : rating) 
            ? 'fill-yellow-500 text-yellow-500' 
            : 'text-gray-300'} 
            ${interactive ? 'cursor-pointer transition-colors' : ''}`}
          onMouseEnter={interactive ? () => setHoveredStar(i) : undefined}
          onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          onClick={interactive ? () => setRating(i) : undefined}
        />
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
      </div>
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2" size={24} />
        Отзывы и оценки
      </h2>

      {/* Add review form */}
      {isAuthenticated ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Оставить отзыв</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Ваша оценка:</label>
            {renderStars(rating, true)}
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">Ваш отзыв:</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Поделитесь своими впечатлениями о товаре..."
              className="w-full"
              rows={4}
            />
          </div>
          <Button 
            onClick={handleAddReview}
            disabled={!comment.trim()}
          >
            Отправить отзыв
          </Button>
        </div>
      ) : (
        <div className="bg-autogray rounded-lg p-4 mb-8 text-center">
          <p>Войдите или зарегистрируйтесь, чтобы оставить отзыв</p>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{review.userName}</div>
                <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
              </div>
              <div className="mb-2">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
          <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
          <p>У этого товара пока нет отзывов</p>
          <p className="text-sm mt-2">Станьте первым, кто оставит отзыв!</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
