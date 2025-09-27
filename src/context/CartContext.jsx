import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { cartAPI } from "../services/api";
import { showSuccess } from "../utils/toast";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [item, setitem] = useState([]);
  const [total, settotal] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const { user } = useAuth();


  //guest
  const saveGuestCart = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const guestCart = {
    items: items,
    totalItems: totalItems,
    totalPrice: totalPrice,
    lastUpdated: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: null,
    _id: 'guest_cart'
  };

  localStorage.setItem('cart_guest', JSON.stringify(guestCart));
  return guestCart;
};

// Add to guest cart
// const addToGuestCart = (cartItem) => {
//   const { product, quantity, color, scent } = cartItem;

//   setItems(prev => {
//     const existingItemIndex = prev.items.findIndex(item => 
//       item.product._id === product._id && 
//       item.color === color && 
//       item.scent === scent
//     );

//     let newItems;
    
//     if (existingItemIndex >= 0) {
//       newItems = prev.items.map((item, index) =>
//         index === existingItemIndex
//           ? { ...item, quantity: item.quantity + quantity }
//           : item
//       );
//     } else {
//       const newItem = {
//         product: product,
//         quantity: quantity,
//         color: color,
//         scent: scent,
//         price: product.price
//       };
//       newItems = [...prev.items, newItem];
//     }

//     saveGuestCart(newItems);
//     return newItems;
//   });
// };

 const addToGuestCart = (cartItem) => {
  const { product, quantity, color, scent } = cartItem;

  setItems(prev => {
    // make sure prev.items is always an array
    const prevItems = prev.items || [];

    const existingItemIndex = prevItems.findIndex(item => 
      item.product._id === product._id && 
      item.color === color && 
      item.scent === scent
    );

    let newItems;

    if (existingItemIndex >= 0) {
      // update quantity
      newItems = prevItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // add new item
      const newItem = {
        product,
        quantity,
        color,
        scent,
        price: product.price,
        id:product._id+color+scent
      };
      newItems = [...prevItems, newItem];
    }

    saveGuestCart(newItems);

    return { ...prev, items: newItems };
  });
};


  const loadcart = async () => {
    try {
      const response = await cartAPI.get();
      settotal(response.data.cart.totalItems);
      setitem(response.data.cart);
      // return response.data.collections;
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  };
  // Load cart from localStorage on mount and when user changes
const loadGuestCart = () => {
  const storedCart = localStorage.getItem('cart_guest');
  if (storedCart) {
    const guestCart = JSON.parse(storedCart);
     settotal(guestCart.totalItems||0)
     setItems(guestCart);
    return guestCart || [];
  }
  return [];
};

//load guest cart
useEffect(() => {
  if (!user) {
    const guestItems = loadGuestCart();
    setItems(guestItems);
    // settotal(guestItems.totalItems)
  }
}, [user]);

  // useEffect(() => {

  //   if(user){
  //     loadcart();
  //   }
  //   if(!user){
  //   const cartKey =  'cart_guest';
  //   const storedCart = localStorage.getItem(cartKey);
  //   if (storedCart) {
  //     setItems(JSON.parse(storedCart));
  //   } else {
  //     setItems([]);
  //   }
  // }
  // }, [user]);
  useEffect(() => {
    const initializeCart = async () => {
      setCartLoading(true);

      if (user) {
        await loadcart();
      } else {
        const cartKey = "cart_guest";
        const storedCart = localStorage.getItem(cartKey);
        setItems(storedCart ? JSON.parse(storedCart) : []);
      }

      setCartLoading(false);
    };

    initializeCart();
  }, [user]);

   
  
  const addToCart = async (cartItem) => {
    const { productId,  quantity, color, scent } = cartItem;
    try {
        const res = await cartAPI.addItem(productId, quantity, color, scent);
        if (res.success) {
          await loadcart();
        }
        // console.log(res)
        return res;
      
    } catch (error) {
      console.log(error);
    }

    //
  };
  // remove from guescart
  const removeFromGuestCart = (id) => {
  setItems(prev => {
    const newItems = prev.items.filter(item => 
      !(item.id === id)
         
    );
    
    saveGuestCart(newItems);
    return newItems;
  });
};

  

  // Update quantity in guest cart
  
  const updateGuestCartQuantity = (Id, newQuantity) => {
  setItems(prev => {
     
    const newItems = prev.items
      .map(item => {
        
        if (item.id === Id) {
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    // console.log('Updated items:', newItems);
    
    const updatedCart = {
      items: newItems,
      totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem('cart_guest', JSON.stringify(updatedCart));
    return updatedCart;
  });
};

  const clearCart = () => {
    localStorage.removeItem('cart_guest');
    // Clear local state
    setItems([]);
    // Optional: Show success message
    showSuccess('Cart cleared successfully');
     
  };

  // const getTotalPrice = () => {
  //   return (
  //     !user &&
  //     items.reduce((total, item) => total + item.price * item.quantity, 0)
  //   );
  // };

  // const getTotalItems = () => {
  //   const ans =
  //     !user && items.reduce((total, item) => total + item.quantity, 0);
  //   if (!user) settotal(ans);
  //   return ans;
  // };

  return (
    <CartContext.Provider
      value={{
        items,
        item,
        total,
        settotal,
        addToCart,
        removeFromGuestCart,
        updateGuestCartQuantity,
        clearCart,
       loadGuestCart,
        addToGuestCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
