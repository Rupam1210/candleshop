import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsAPI, collectionsAPI } from '../services/api';
import { showSuccess, showError } from '../utils/toast';

const ProductContext = createContext(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);
  // Load products from API
  const loadProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll(params);
      setAllProducts(response.data.products);
      
      return response.data;
    } catch (error) {
      console.error('Failed to load products:', error);
      return { products: [], pagination: {} };
    } finally {
      setLoading(false);
    }
  };

  // Load collections from API
  const loadCollections = async () => {
    try {
      const response = await collectionsAPI.getAll();
      setAllCollections(response.data.collections);
      return response.data.collections;
    } catch (error) {
      console.error('Failed to load collections:', error);
      return [];
    }
  };

  // Load initial data
  useEffect(() => {
    loadProducts();
    loadCollections();
  }, []);
  const getProductById = async(id) => {
    try {
      const response =  await productsAPI.getById(id);
       
      return response.data.product;
    } catch (error) {
      console.error('Failed to load product:', error);
      return [];
    }
    
    // return allProducts.find(product => product._id === id);
  };

  const getProductsByCollection = async(id) => {
    // console.log(allProducts[0]?.collection._id)
    try{
      const response = await productsAPI.getByCollectionId(id);
      return response.data.products;
    }catch(error){
      console.error('Failed to get products by collection:', error);
      return [];
    }
  };

  const getCollectionBySlug = (id) => {
    // console.log(id)
    return allCollections.find(collection => collection._id === id);
  };

  const addProduct = async (productData) => {
    try {
      const response = await productsAPI.create(productData);
      setAllProducts(prev => [...prev, response.data.product]);
      showSuccess('Product added successfully!');
      return { success: true, product: response.data.product };
    } catch (error) {
      showError('Failed to add product');
      return { success: false, error: error.message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await productsAPI.update(id, productData);
      setAllProducts(prev => 
        prev.map(product => 
          product._id === id ? response.data.product : product
        )
      );
      showSuccess('Product updated successfully!');
      return { success: true, product: response.data.product };
    } catch (error) {
      showError('Failed to update product');
      return { success: false, error: error.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      setAllProducts(prev => prev.filter(product => product._id !== id));
      showSuccess('Product deleted successfully!');
      return { success: true };
    } catch (error) {
      showError('Failed to delete product');
      return { success: false, error: error.message };
    }
  };

  const addCollection = async (collectionData) => {
    try {
      const response = await collectionsAPI.create(collectionData);
      setAllCollections(prev => [...prev, response.data.collection]);
      showSuccess('Collection added successfully!');
      return { success: true, collection: response.data.collection };
    } catch (error) {
      showError('Failed to add collection');
      return { success: false, error: error.message };
    }
  };

  const updateCollection = async (id, collectionData) => {
    try {
      const response = await collectionsAPI.update(id, collectionData);
      setAllCollections(prev => 
        prev.map(collection => 
          collection._id === id ? response.data.collection : collection
        )
      );
      showSuccess('Collection updated successfully!');
      return { success: true, collection: response.data.collection };
    } catch (error) {
      showError('Failed to update collection');
      return { success: false, error: error.message };
    }
  };

  const deleteCollection = async (id) => {
    try {
      await collectionsAPI.delete(id);
      setAllCollections(prev => prev.filter(collection => collection._id !== id));
      showSuccess('Collection deleted successfully!');
      return { success: true };
    } catch (error) {
      showError('Failed to delete collection');
      return { success: false, error: error.message };
    }
  };

  const searchProducts = (query) => {
    if (!query) return allProducts;
    
    const lowercaseQuery = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.scent.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getFilteredProducts = (filters) => {
    let filtered = allProducts;

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.collection) {
      filtered = filtered.filter(product => product.collection === filters.collection);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    return filtered;
  };

  return (
    <ProductContext.Provider value={{
      products: allProducts,
      collections: allCollections,
      loading,
      loadProducts,
      loadCollections,
      getProductById,
      getProductsByCollection,
      getCollectionBySlug,
      addProduct,
      updateProduct,
      deleteProduct,
      addCollection,
      updateCollection,
      deleteCollection,
      searchProducts,
      getFilteredProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};