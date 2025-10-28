import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collectionsAPI } from '../services/api';
import { showError } from '../utils/toast';
import LoadingSpinner from './LoadingSpinner';
import { useProducts } from '../context/ProductContext';

const CollectionShowcase = memo(() => {
  // const [collections, setCollections] = useState([]);
  const { collections, loading } = useProducts();
  // console.log(collections);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadCollections();
  // }, []);

  // const loadCollections = async () => {
  //   try {
  //     const response = await collectionsAPI.getAll();
  //     setCollections(response.data.collections);
  //   } catch (error) {
  //     showError('Failed to load collections');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <LoadingSpinner text="Loading collections..." />;
  }

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
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Collections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, each designed to evoke specific moods and memories.
          </p>
        </motion.div>

        <motion.div 
          
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {collections?.map((collection, index) => (
            <motion.div
              key={collection._id || collection.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl shadow-lg group ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`aspect-video ${index === 0 ? 'md:aspect-[2/1]' : ''} relative`}>
                <img
                  src={collection.image?.url || collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/f0f0f0/333333?text=Collection';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3 
                    
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                  >
                    {collection.name}
                  </motion.h3>
                  {/* <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 mb-4 max-w-md"
                  >
                    {collection.description}
                  </motion.p> */}
                  <motion.div
                    
                  >
                    <Link
                      to={`/collections/${collection._id}`}
                      className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

CollectionShowcase.displayName = 'CollectionShowcase';

export default CollectionShowcase;