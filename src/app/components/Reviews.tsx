"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaRegStar, FaUser, FaQuoteLeft } from 'react-icons/fa';

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  date: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    rating: 5,
    text: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Загрузка отзывов при монтировании компонента
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      }
    };
    
    fetchReviews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };
  
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const createdReview = await response.json();
        
        // Добавляем новый отзыв в список
        setReviews(prev => [createdReview, ...prev]);
        
        // Сбрасываем форму
        setNewReview({
          name: '',
          company: '',
          rating: 5,
          text: ''
        });
        
        setReviewSubmitted(true);
        
        // Скрываем сообщение об успешной отправке через 3 секунды
        setTimeout(() => {
          setReviewSubmitted(false);
        }, 3000);
      } else {
        console.error('Ошибка при отправке отзыва');
      }
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <section className="section-container" id="reviews" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 w-full">
          <h2 className="section-title gradient-text font-heading">Отзывы</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Узнайте, что говорят о сотрудничестве со мной клиенты и коллеги.
          </p>
        </motion.div>
        
        <div className="w-full max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="glass-card p-8 flex flex-col hover-lift rounded-2xl"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-secondary-50 mb-1">{review.name}</h4>
                    <p className="text-sm md:text-base text-secondary-300">{review.company}</p>
                  </div>
                  <div className="text-sm text-secondary-300">{review.date}</div>
                </div>
                
                <div className="flex mb-5">
                  {[...Array(5)].map((_, i) => (
                    review.rating > i 
                      ? <FaStar key={i} className="text-primary-500 text-xl" /> 
                      : <FaRegStar key={i} className="text-secondary-400 text-xl" />
                  ))}
                </div>

                <div className="relative">
                  <FaQuoteLeft className="text-primary-500/20 text-4xl absolute -top-2 -left-1" />
                  <p className="text-secondary-200 flex-grow pl-6 pt-2 text-lg italic">{review.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Форма для отправки отзыва */}
        <div className="w-full max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <div className="glass-card p-10 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-secondary-50 font-heading text-center">Оставить отзыв</h3>
              
              {reviewSubmitted ? (
                <div className="bg-primary-900/30 border border-primary-700 text-secondary-50 p-6 rounded-xl text-center mb-8 text-lg">
                  Спасибо за ваш отзыв! Он успешно добавлен.
                </div>
              ) : null}
              
              <form onSubmit={handleReviewSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-secondary-200 mb-3 text-lg">Ваше имя *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={newReview.name}
                      onChange={handleReviewChange}
                      className="w-full p-4 bg-dark-800 border border-dark-600 rounded-xl focus:border-primary-500 focus:outline-none text-secondary-100 text-lg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-secondary-200 mb-3 text-lg">Компания</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={newReview.company}
                      onChange={handleReviewChange}
                      className="w-full p-4 bg-dark-800 border border-dark-600 rounded-xl focus:border-primary-500 focus:outline-none text-secondary-100 text-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-secondary-200 mb-3 text-lg">Оценка *</label>
                  <div className="flex space-x-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(rating)}
                        className="text-3xl focus:outline-none transition-transform hover:scale-110"
                      >
                        {rating <= newReview.rating ? (
                          <FaStar className="text-primary-500" />
                        ) : (
                          <FaRegStar className="text-secondary-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="text" className="block text-secondary-200 mb-3 text-lg">Ваш отзыв *</label>
                  <textarea
                    id="text"
                    name="text"
                    required
                    rows={5}
                    value={newReview.text}
                    onChange={handleReviewChange}
                    className="w-full p-4 bg-dark-800 border border-dark-600 rounded-xl focus:border-primary-500 focus:outline-none text-secondary-100 text-lg"
                    placeholder="Расскажите о вашем опыте сотрудничества..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="btn btn-primary hover-lift inline-flex items-center gap-3 px-10 py-4 text-xl"
                  >
                    {isSubmittingReview ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <FaUser className="text-xl" />
                        Отправить отзыв
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 