import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Edit } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ImageUpload from './ImageUpload';

const AdminUpload = ({ isOpen, onClose }) => {
  const { addProduct, updateProduct, deleteProduct, collections, products } = useProducts();
  const [mode, setMode] = useState('add'); // 'add' or 'edit'
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    images: [],
    description: '',
    longDescription: '',
    category: '',
    collection: '',
    scent: '',
    color: '',
    burnTime: '',
    size: '',
    weight: '',
    inStock: true,
    featured: false,
    ingredients: ['Soy Wax'],
    careInstructions: {
      firstBurn: '',
      trimWick: '',
      safety: ''
    }
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCareInstructionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      careInstructions: {
        ...prev.careInstructions,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.collection) newErrors.collection = 'Collection is required';
    if (!formData.scent.trim()) newErrors.scent = 'Scent is required';
     if (!formData.color.trim()) newErrors.color = 'Colour is required';
    if (!formData.burnTime.trim()) newErrors.burnTime = 'Burn time is required';
    if (!formData.size.trim()) newErrors.size = 'Size is required';
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';

    // Validate images
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    // Validate ingredients
    const validIngredients = formData.ingredients.filter(ing => ing.trim());
    if (validIngredients.length === 0) newErrors.ingredients = 'At least one ingredient is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Clean up data
    const cleanedData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      ingredients: formData.ingredients.filter(ing => ing.trim())
    };

    if (mode === 'edit' && editingProduct) {
      updateProduct(editingProduct._id, cleanedData).then((result) => {
        if (result.success) {
          resetForm();
          onClose();
        }
      });
    } else {
      addProduct(cleanedData).then((result) => {
        if (result.success) {
          resetForm();
          window.location.reload();

          onClose();
        }
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      images: [],
      description: '',
      longDescription: '',
      category: '',
      collection: '',
      scent: '',
      color: '',
      burnTime: '',
      size: '',
      weight: '',
      inStock: true,
      featured: false,
      ingredients: ['Soy Wax'],
      careInstructions: {
        firstBurn: '',
        trimWick: '',
        safety: ''
      }
    });
    setErrors({});
    setMode('add');
    setEditingProduct(null);
  };

  // const handleEdit = (product) => {
  //   setEditingProduct(product);
  //   setMode('edit');
  //   setFormData({
  //     name: product.name,
  //     price: product.price.toString(),
  //     originalPrice: product.originalPrice?.toString() || '',
  //     images: product.images || [],
  //     description: product.description,
  //     longDescription: product.longDescription || '',
  //     category: product.category,
  //     collection: product.collection,
  //     scent: product.scent,
  //     burnTime: product.burnTime,
  //     size: product.size,
  //     weight: product.weight,
  //     inStock: product.inStock,
  //     featured: product.featured,
  //     ingredients: product.ingredients || ['Soy Wax'],
  //     careInstructions: product.careInstructions || {
  //       firstBurn: '',
  //       trimWick: '',
  //       safety: ''
  //     }
  //   });
  // };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    resetForm();
                    setMode('add');
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    mode === 'add' 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Add New
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Product List for Editing */}
            {/* {mode === 'add' && (
              <div className="mb-6 max-h-40 overflow-y-auto border rounded-lg">
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="font-semibold text-gray-900">Existing Products (Click to Edit)</h3>
                </div>
                <div className="divide-y">
                  {products.map((product) => (
                    <div key={product._id} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images?.[0] }
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                          
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Fresh Collection"
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection *
                    </label>
                    <select
                      name="collection"
                      value={formData.collection}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.collection ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a collection</option>
                      {collections.map((collection) => (
                        <option key={collection._id} value={collection._id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                    {errors.collection && <p className="text-red-500 text-sm mt-1">{errors.collection}</p>}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scent Profile *
                    </label>
                    <input
                      type="text"
                      name="scent"
                      value={formData.scent}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.scent ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Vanilla, Amber, Cream"
                    />
                    {errors.scent && <p className="text-red-500 text-sm mt-1">{errors.scent}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Colour *
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.scent ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Pink , Red"
                    />
                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Burn Time *
                      </label>
                      <input
                        type="text"
                        name="burnTime"
                        value={formData.burnTime}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.burnTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 45-50 hours"
                      />
                      {errors.burnTime && <p className="text-red-500 text-sm mt-1">{errors.burnTime}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size *
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.size ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 8 oz"
                      />
                      {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight *
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.weight ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 227g"
                    />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">In Stock</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Descriptions</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Brief product description"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Description
                  </label>
                  <textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Detailed product description"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                <ImageUpload
                  images={formData.images}
                  onChange={(images) => setFormData(prev => ({ ...prev, images }))}
                  multiple={true}
                />
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>

              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ingredient"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('ingredients', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('ingredients')}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Ingredient</span>
                </button>
                {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
              </div>

              {/* Care Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Care Instructions</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Burn
                  </label>
                  <input
                    type="text"
                    value={formData.careInstructions.firstBurn}
                    onChange={(e) => handleCareInstructionChange('firstBurn', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="First burn instructions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wick Trimming
                  </label>
                  <input
                    type="text"
                    value={formData.careInstructions.trimWick}
                    onChange={(e) => handleCareInstructionChange('trimWick', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Wick trimming instructions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety
                  </label>
                  <input
                    type="text"
                    value={formData.careInstructions.safety}
                    onChange={(e) => handleCareInstructionChange('safety', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Safety instructions"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>{mode === 'edit' ? 'Update Product' : 'Add Product'}</span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUpload;