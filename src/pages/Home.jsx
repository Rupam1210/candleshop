import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CollectionShowcase from '../components/CollectionShowcase';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <FeaturedProducts />
      <CollectionShowcase />
      <Features />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;