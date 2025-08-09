import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please sign in to proceed with checkout');
      return;
    }
    
    // Here you would integrate with a payment processor like Stripe
    alert('Checkout functionality would be integrated with a payment processor');
  };
  console.log(items)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({getTotalItems()})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-400 mb-4">Add some beautiful candles to get started</p>
                <button
                  onClick={onClose}
                  className="text-rose-600 hover:text-rose-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item?.images[0]?.url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm font-semibold text-rose-600">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {items.length > 0 && (
                  <div className="pt-4 border-t">
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Clear all items
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{getTotalPrice() >= 50 ? 'Free' : '$5.99'}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>${(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-rose-700 text-white py-3 rounded-lg font-semibold hover:bg-rose-800 transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Proceed to Checkout</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              
              {getTotalPrice() < 50 && (
                <p className="text-xs text-center text-gray-500">
                  Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;