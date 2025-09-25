import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit, Trash2, Save, X as Cancel } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ImageUpload from './ImageUpload';

const AdminCollectionManager = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  const { collections, addCollection, updateCollection, deleteCollection, loadCollections } = useProducts();
  const { user } = useAuth();
  const [editingCollection, setEditingCollection] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: { url: '' }
  });
  const [errors, setErrors] = useState({});

  if (!isOpen || !user || user.role !== 'admin') return null;

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
    
  //   if (errors[name]) {
  //     setErrors(prev => ({ ...prev, [name]: '' }));
  //   }
  // };


const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'image.url') {
    setFormData(prev => ({
      ...prev,
      image: {
        ...prev.image,
        url: value
      }
    }));
    if (errors.image?.url) {
      setErrors(prev => ({
        ...prev,
        image: { ...prev.image, url: '' }
      }));
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }
};







  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let result;
      // console.log(formData)
      if (editingCollection) {
        result = await updateCollection(editingCollection._id, formData);
      } else {
        result = await addCollection(formData);
      }

      if (result.success) {
        resetForm();
        setShowAddForm(false);
        setEditingCollection(null);
        await loadCollections();
        //  
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    }
  };

  const handleEdit = (collection) => {
   if (modalRef.current) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image.url || collection.image
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      const result = await deleteCollection(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image:{url:''} 
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setEditingCollection(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Collections</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Collection</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Add/Edit Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    {editingCollection ? 'Edit Collection' : 'Add New Collection'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Collection Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter collection name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Collection Image *
                        </label>
                        <ImageUpload
                          images={formData.image}
                          onChange={(image) => setFormData(prev => ({ ...prev, image: { url: image } }))}
                          multiple={false}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter collection description"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Cancel className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{editingCollection ? 'Update' : 'Create'}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => {
                const imageUrl = typeof collection.image === 'string' 
                  ? collection.image 
                  : collection.image?.url || 'https://via.placeholder.com/400x300/f0f0f0/333333?text=No+Image';
                
                return (
                <motion.div
                  key={collection._id || collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  ref={modalRef} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <img
                      src={imageUrl}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/f0f0f0/333333?text=No+Image';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button

                        onClick={() => handleEdit(collection)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(collection._id || collection.id)}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{collection.productCount || 0} products</span>
                      <span>Created: {new Date(collection.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>

            {collections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No collections found.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                >
                  Create your first collection
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCollectionManager;