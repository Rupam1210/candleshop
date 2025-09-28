import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-rose-400">FragratiingFlare</h3>
            <p className="text-gray-300 leading-relaxed">
              Crafting premium candles that illuminate your most precious moments with luxury and elegance .
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">All Candles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Signature Collection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seasonal Scents</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Candle Care Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-400" />
                <span className="text-gray-300">fragratiingflare@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-400" />
                <span className="text-gray-300">+918004613226</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span className="text-gray-300">Varanasi, UP, India</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Business Hours</h5>
              <p className="text-sm text-gray-400">Mon-Fri: 9AM-6PM PST</p>
              <p className="text-sm text-gray-400">Sat-Sun: 10AM-4PM PST</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap items-center justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2 text-gray-400">
              {/* <Truck className="h-5 w-5" />
              <span className="text-sm">Free Shipping $50+</span> */}
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">All Major Cards</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 FragratiingFlare. All rights reserved. | 
              <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-1">Terms of Service</a> |
              <a href="#" className="hover:text-white ml-1">Accessibility</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;