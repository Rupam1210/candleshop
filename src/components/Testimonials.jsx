import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely love these candles! The scents are incredible and they burn so evenly. The Midnight Rose is my favorite - it fills my entire living room with the most beautiful fragrance.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'New York, NY'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Best candles I\'ve ever purchased. The quality is outstanding and the packaging is beautiful. Perfect for gifts! I\'ve ordered multiple times and they never disappoint.',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'San Francisco, CA'
    },
    {
      name: 'Emily Rodriguez',
      rating: 5,
      comment: 'These candles have transformed my home. The burn time is amazing and the scents are so sophisticated and calming. I love how they make every room feel like a spa.',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Austin, TX'
    },
    {
      name: 'David Kim',
      rating: 5,
      comment: 'The customer service is exceptional and the candles are even better in person. Fast shipping and beautiful presentation. Highly recommend to anyone looking for luxury candles.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Seattle, WA'
    }
  ];

  return (
    <section className="py-16 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">Don't just take our word for it – hear from our satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.comment}"</p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">4.9/5 from 2,847+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;