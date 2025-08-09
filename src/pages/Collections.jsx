import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Collections = () => {
  const { collections, getProductsByCollection } = useProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Collections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each collection tells a unique story through carefully curated fragrances. 
            Discover the perfect scents to match your mood, season, or special moments.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {collections.map((collection, index) => {
            const productCount = getProductsByCollection(collection.slug).length;
            
            return (
              <motion.div
                key={collection._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg group ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`aspect-video ${index === 0 ? 'md:aspect-[2.5/1]' : ''} relative`}>
                  <img
                    src={collection.image.url}
                    alt={collection.name.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {collection.name}
                      </h2>
                      <p className="text-white/90 mb-6 max-w-2xl text-lg">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={`/collections/${collection._id}`}
                            className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
                          >
                            Explore Collection
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </motion.div>
                        <div className="text-white/80 text-sm">
                          {productCount} {productCount === 1 ? 'Product' : 'Products'}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Decide?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our complete product catalog to find the perfect candle for any occasion. 
            Each one is handcrafted with love and attention to detail.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/products"
              className="inline-flex items-center bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors group"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Collections;