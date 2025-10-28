import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import myimage from '../../src/image/hero.jpg' ;
import GlowingDiwaliCircle from './Sale';
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Create Your Perfect Moment",
      subtitle: "Handcrafted with Love",
      description: "Hand-poured luxury candles crafted with premium soy wax and carefully curated fragrances. Transform any space into a sanctuary of warmth and tranquility.",
      image: "https://images.pexels.com/photos/4021876/pexels-photo-4021876.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Shop Collection"
    },
    {
      title: "Illuminate Your Space",
      subtitle: "Premium Quality",
      description: "Discover our exclusive collection of artisan candles, each one carefully crafted to bring warmth and elegance to your home.",
      image: "https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Explore Now"
    },
    {
      title: "Scents That Tell Stories",
      subtitle: "Artisan Crafted",
      description: "Every candle tells a story through its unique fragrance blend. Find the perfect scent to match your mood and create lasting memories.",
      image: "https://images.pexels.com/photos/4021870/pexels-photo-4021870.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Shop Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-amber-700"
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wide">Handcrafted with Love</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                Create Your
                <span className="text-amber-700 block">Perfect Moment</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Hand-poured luxury candles crafted with premium soy wax and carefully curated fragrances. 
                Transform any space into a sanctuary of warmth and tranquility.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex   items-center justify-center  flex-col space-y-2 sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='hidden'>
                <Link 
                  to="/products"
                  className="  bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center group"
                >
                  Shop Collection
                  <ArrowRight className=" h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/products"
                  className="  bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center group"
                >
                  Shop Collection
                  <ArrowRight className=" h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/collections"
                  className=" border-2 border-amber-700  text-amber-700 px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 hover:text-white transition-colors   "
                >
                  Explore Collections
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-3xl font-bold text-amber-700"
                >
                  50+
                </motion.div>
                <div className="text-sm text-gray-600">Unique Scents</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-3xl font-bold text-amber-700"
                >
                  100%
                </motion.div>
                <div className="text-sm text-gray-600">Natural Soy Wax</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  className="text-3xl font-bold text-amber-700"
                >
                  35H+
                </motion.div>
                <div className="text-sm text-gray-600">Average Burn Time</div>
              </div>
                 
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={myimage}
                  alt="Luxury candle collection"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg"
              >
             
                <div className="flex items-center space-x-3">
                  
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">Free shipping on orders ₹ 100+</span>
                </div>
              </motion.div>
              {/* <GlowingDiwaliCircle/> */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-6 -right-6 bg-amber-700 text-white rounded-xl p-4 shadow-lg"
              >

                <div className="text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-xs">★★★★★</div>
                  <div className="text-xs opacity-90">247+ reviews</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;