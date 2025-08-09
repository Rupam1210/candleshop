import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary } from '../services/api';
import { showError, showSuccess } from '../utils/toast';

const ImageUpload = ({ images = [], onChange, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  // console.log(images)

  const handleFileUpload = async (files) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      if (multiple) {
        onChange([...images, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
      
      showSuccess('Images uploaded successfully!');
      console.log(uploadedUrls);
    } catch (error) {
      showError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    if (multiple) {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    } else {
      onChange('');
    }
  };

  // const displayImages = multiple ? images : (images ? [images] : []);
  // const displayImages = multiple
  // ? images.map(img => img.url)
  // : images
  // ? [images.url]
  // : [];
const displayImages = React.useMemo(() => {
  if (!images) return []; // No images
  if (Array.isArray(images)) {
    // Array of strings or array of objects
    return images.map(img => typeof img === "string" ? img : img.url || "");
  }
  if (typeof images === "string") {
    // Single string URL
    return [images];
  }
  if (typeof images === "object" && images.url) {
    // Single object with URL
    return [images.url];
  }
  return [];
}, [images]);
  

  // console.log(displayImages)

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
            ) : (
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        </label>
      </div>

      {/* Image Preview */}
      {displayImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages?.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                // onError={(e) => {
                //   e.target.src = 'https://via.placeholder.com/150x150/f0f0f0/333333?text=Image';
                // }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;