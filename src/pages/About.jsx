import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';
import myimage from '../../src/image/hero.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Handcrafted with Love',
      description: 'Every candle is carefully hand-poured with attention to detail and passion for quality.'
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'We use only premium soy wax and natural essential oils for a clean, eco-friendly burn.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Our commitment to excellence ensures each candle meets the highest standards of quality.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We believe in building lasting relationships with our customers and supporting local communities.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded with a passion for creating beautiful, sustainable candles that bring warmth and joy to every home.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Illuminating Lives Since 2025</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  What started as a small passion project in our kitchen has grown into a beloved brand 
                  that brings the perfect ambiance to homes across the country. We believe that the right 
                  scent can transform any space and create lasting memories.
                </p>
                <p>
                  Our journey began when we couldn't find candles that met our standards for quality, 
                  sustainability, and beautiful fragrance. So we decided to create our own, using only 
                  the finest natural ingredients and time-honored techniques.
                </p>
                <p>
                  Today, each candle is still hand-poured with the same care and attention to detail 
                  that started it all. We're proud to be part of your special moments, from quiet 
                  evenings at home to celebrations with loved ones.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={myimage}
                alt="Candle making process"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from sourcing materials to crafting each candle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To create exceptional candles that not only fill your space with beautiful fragrance 
              but also contribute to a more sustainable world. We're committed to using eco-friendly 
              materials, supporting local communities, and bringing moments of peace and joy to your daily life.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;