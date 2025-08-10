import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
  {
    name: 'Aarav Mehta',
    rating: 5,
    comment: 'Absolutely love these candles! The fragrances are divine and they burn so evenly. The Midnight Rose is my favourite – it fills my entire living room with the most beautiful aroma.',
    image: "https://cdn-icons-png.flaticon.com/512/847/847969.png"  ,
    location: 'Mumbai, Maharashtra'
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'These are the best candles I’ve ever bought. The quality is superb and the packaging is so elegant. Makes for a perfect gift! I’ve ordered multiple times and they never disappoint.',
    image: "https://cdn-icons-png.flaticon.com/512/847/847969.png" ,
    location: 'Delhi, India'
  },
  {
    name: 'Rohan Iyer',
    rating: 5,
    comment: 'These candles have completely transformed my home. The burn time is amazing and the fragrances are so calming. Every room now feels like a spa.',
    image:"https://cdn-icons-png.flaticon.com/512/847/847969.png"  ,
    location: 'Bengaluru, Karnataka'
  },
  {
    name: 'Neha Kapoor',
    rating: 5,
    comment: 'The customer service is fantastic and the candles look even better in person. Fast delivery and beautiful presentation. Highly recommended for anyone looking for luxury candles.',
    image: "https://cdn-icons-png.flaticon.com/512/847/847969.png"  ,
    location: 'Jaipur, Rajasthan'
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