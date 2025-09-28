import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { showSuccess } from '../utils/toast';
 
 
 

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const {transferGuestCartToUser}=useCart();
   

  useEffect(() => {
    // Check for stored token and get user data
    
      loadUser();
    
  }, []);

  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      // console.error('Failed to load user:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      const { user, token } = response.data;
      
      //localStorage.setItem('token', token);
      setUser(user);
      showSuccess("Login successfully")
      setIsLoading(false);
      return { success: true, user };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(name, email, password);
      const { user, token } = response.data;
      if(user){
      
      // localStorage.setItem('token', token);
      setUser(user);
      setIsLoading(false);}
      return { success: true, user };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = async() => {
    await authAPI.logout();
    setUser(null);
     
    // localStorage.removeItem('token');

    
  };

  const updateProfile = async(userData) => {
    try {
      const res=await authAPI.updateProfile(userData);
      // console.log(res)
      setUser(res.data.user)
    } catch (error) {
      throw error
    }
    // const updatedUser = { ...user, ...userData };
    // setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};