import React from 'react';
import { Leaf, Truck, Award, Clock, Shield, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Made with premium soy wax and natural essential oils for a clean, long-lasting burn.'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on all orders over $50. Fast and secure delivery nationwide.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Hand-poured in small batches using the finest materials and time-tested techniques.'
    },
    {
      icon: Clock,
      title: '45+ Hour Burn',
      description: 'Extended burn time ensures you can enjoy your favorite scents for weeks to come.'
    },
    {
      icon: Shield,
      title: 'Safe & Non-Toxic',
      description: 'Lead-free wicks and phthalate-free fragrances for a safe, worry-free experience.'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Each candle is crafted with care and attention to detail by our skilled artisans.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LuxeCandle</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to creating the finest candles that transform your space into a sanctuary of comfort and beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:bg-rose-50 p-6 rounded-xl transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6 group-hover:bg-rose-200 transition-colors">
                <feature.icon className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;