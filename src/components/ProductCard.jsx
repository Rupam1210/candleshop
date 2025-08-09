import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Check, Eye, Edit } from 'lucide-react';
// import { useCart } from '../hooks/useCart';
// import { useAuth } from '../hooks/useAuth';
import ProductEditModal from './ProductEditModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onUpdate }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  };

  const canEdit = user && ['admin', 'seller', 'owner'].includes(user.role);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link to={`/products/${product._id || product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/400x400/f0f0f0/333333?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400/f0f0f0/333333?text=No+Image';
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
              >
                Sale
              </motion.div>
            )}
            {product.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
              >
                Featured
              </motion.div>
            )}
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold bg-black bg-opacity-75 px-4 py-2 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <AnimatePresence>
            {isHovered && product.inStock && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-4 bottom-4 flex gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-amber-700 text-white hover:bg-amber-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick View */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:opacity-0 ">
            <div className="flex space-x-2">
              {canEdit && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEdit}
                  className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-amber-600 font-medium">{product.category}</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-amber-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{product.burnTime}</div>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong>Scent:</strong> {product.scent}</div>
              <div><strong>Size:</strong> {product.size}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>

    <ProductEditModal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      product={product}
      onUpdate={onUpdate}
    />
    </>
  );
};

export default ProductCard;