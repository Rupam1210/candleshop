import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../services/api';
import { showError, showSuccess } from '../utils/toast';

const Cart = ({ isOpen, onClose }) => {
  const { items,item, updateGuestCartQuantity, removeFromGuestCart,loadGuestCart, clearCart,settotal } = useCart();
  const { isAuthenticated,user } = useAuth();
  const [carts,setcart]=useState([]);
   const [load,setload]=useState(false);
   const [loadid,setloadid]=useState(null);
  //  console.log(items)

  const loadcart = async () => {
      try {
        const response = await cartAPI.get();
        // console.log(response.data.cart)
        settotal(response.data.cart.totalItems)
        setcart(response.data.cart);

        // return response.data.collections;
      } catch (error) {
        console.error('Failed to load cart:', error);
        return [];
      }
    };
   
    useEffect(() => {
      if(user){
      loadcart();}
      if(!user){
        setcart(items)
        loadGuestCart();
      }
         
      }, [isOpen,user]);
   
   
   const upQuantity=async(itemid,qty)=>{
    setload(true)
    setloadid(itemid)
    try {
         const res=await cartAPI.updateItem(itemid,qty);
      // console.log(res)
      if(res.success){
         await loadcart();
         setload(false);
      }
     
    } catch (error) {
      showError(error)
      setload(false)
    }
   }
    const upquestQuantity=async(Id,qty)=>{
    try {
        await updateGuestCartQuantity(Id, qty)
       const res=await loadGuestCart();
        
        setcart(res)
       
        // console.log(res)
    } catch (error) {
      showError(error)
       
    }
   }

   if (!isOpen) return null;
  //  console.log(carts)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please sign in to proceed with checkout');
      return;
    }
    
    // Here you would integrate with a payment processor like Stripe
    alert('Checkout functionality would be integrated with a payment processor');
  };
  const remove= async(itemid,id)=>{
    try {
      if(user){
        const res=await cartAPI.removeItem(itemid);
      if(res.success){
        await loadcart();
        showSuccess("Removed")
      }
      }else{
        await removeFromGuestCart(id);
        const res=await loadGuestCart();
         
        setcart(res)
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }
  const clearall= async()=>{
    try {
      if(user){
      const res=await cartAPI.clear();
      if(res.success){
        await loadcart();
        showSuccess("All Removed")
      }
      }else{
        await clearCart()
        setcart([]);
        settotal(0);
        await loadGuestCart();
        
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(items)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({carts?.totalItems})
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
            {(carts?.items?.length === 0) ||(carts.length === 0)  ? (
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
                {carts.items?.map((item,index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item?.product.images[0]?.url}
                      alt={item?.product.images[0]?.alt}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.product.category}</p>
                      <p className="text-sm text-gray-500"><b>Fragrance:</b> {item.scent}</p>
                      <p className="text-sm text-gray-500"><b>Colour:</b> {item.color}</p>
                      <p className="text-sm font-semibold text-rose-600">₹{item.product.price?.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-2">
                        {user&&
                        <button
                          onClick={() => upQuantity(item._id, item.quantity - 1)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          >
                          {/* item.product._id,item.scent,item.color, */}
                          {load &&(loadid==item._id) ? (
    <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <Minus className="h-4 w-4" />)}
                       
                        </button>}
                        {/* guestuser */}
                         {!user&&
                        <button
                          onClick={() => upquestQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-gray-600 p-1" 
                          
                        >
                           
    <Minus className="h-4 w-4" /> 
                           
                        </button>}

                        <span className="mx-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                       {user&& <button
                          onClick={() => upQuantity(item._id, item.quantity + 1)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          
                        >
                          {load &&(loadid==item._id) ? (
    <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <Plus className="h-4 w-4" />)}
                           
                        </button>}
                        {!user&&
                        <button
                          onClick={() => upquestQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          
                        >
                           
    <Plus className="h-4 w-4" /> 
                           
                        </button>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{(item.price * item.quantity)?.toFixed(2)}
                      </div>
                      <button
                        onClick={() => remove(item?._id ,item.id)}
                        className="text-xs text-red-500 hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {carts?.items?.length > 0 && (
                  <div className="pt-4 border-t">
                    <button
                      onClick={clearall}
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
          {carts?.items?.length > 0 && (
            <div className="border-t p-6 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{carts.totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{carts.totalPrice>= 100 ? 'Free' : '₹99'}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>₹{(carts.totalPrice + (carts.totalPrice >= 100 ? 0 : 99))?.toFixed(2)}</span>
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
              
              {item.totalPrice < 50 && (
                <p className="text-xs text-center text-gray-500">
                  Add ₹{(50 - carts.totalPrice)?.toFixed(2)} more for free shipping!
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
