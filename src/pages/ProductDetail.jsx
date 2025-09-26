import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

// available scents
const parseScentsFromString = (scentsString) => {
  const scentDescriptions = {
    lavender: "Calming floral scent with relaxing properties",
    coffee: "Rich aromatic blend with warm coffee notes",
    lemon: "Fresh citrus burst with energizing qualities",
    "raspberry vanilla": "Sweet fruity blend with creamy vanilla",
    vanilla: "Classic warm scent with comforting notes",
    musk: "Deep earthy notes with mysterious allure",
    rose: "Romantic floral with timeless elegance",
    "green apple": "Crisp fresh fruit with invigorating scent",
    jasmine: "Exotic floral with intoxicating fragrance",
    sandalwood: "Woody and warm with meditative qualities",
    eucalyptus: "Fresh and minty with spa-like feel",
    cinnamon: "Warm spice with cozy winter vibes",
    "ocean breeze": "Fresh and airy with coastal essence",
    "cherry blossom": "Delicate floral with spring freshness",
    amber: "Rich and resinous with luxury feel",
    peppermint: "Cool and refreshing with tingling sensation",
  };

  return scentsString.split(",").map((scent, index) => {
    const trimmedScent = scent.trim().toLowerCase();
    const scentId = trimmedScent.replace(/\s+/g, "-");
    return {
      id: scentId,
      name: scent.trim(),
      description:
        scentDescriptions[trimmedScent] ||
        `Delightful ${scent.trim().toLowerCase()} fragrance`,
    };
  });
};

// Parse colors from string and add color codes
const parseColorsFromString = (colorsString) => {
  const colorData = {
    pink: { color: "#FFB6C1", description: "Soft and romantic pink" },
    red: { color: "#DC143C", description: "Bold and passionate red" },
    white: { color: "#FFFFFF", description: "Pure and classic white" },
    purple: { color: "#DDA0DD", description: "Elegant and royal purple" },
    yellow: { color: "#FFD700", description: "Bright and cheerful yellow" },
    blue: { color: "#87CEEB", description: "Calm and serene blue" },
    green: { color: "#90EE90", description: "Fresh and natural green" },
    orange: { color: "#FFA500", description: "Vibrant and energetic orange" },
    black: { color: "#2F2F2F", description: "Sophisticated and sleek black" },
    cream: { color: "#F5F5DC", description: "Warm and cozy cream" },
    coral: { color: "#FF7F50", description: "Tropical and lively coral" },
    lavender: { color: "#E6E6FA", description: "Gentle and soothing lavender" },
  };

  return colorsString.split(",").map((color, index) => {
    const trimmedColor = color.trim().toLowerCase();
    const colorId = trimmedColor.replace(/\s+/g, "-");
    return {
      id: colorId,
      name: color.trim(),
      color: colorData[trimmedColor]?.color || "#CCCCCC",
      description:
        colorData[trimmedColor]?.description ||
        `Beautiful ${color.trim().toLowerCase()} shade`,
    };
  });
};

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedScent, setSelectedScent] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
   const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await getProductById(id);

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/products"); // optional: handle error same way
      }
    };
    fetchProduct();
  }, [id, getProductById, navigate]);

  // useEffect(() => {
  //   if (product) {
  //     const scents = parseScentsFromString(product.scent);
  //     const colors = parseColorsFromString(product.color);

  //     // Set default selections
  //     if (scents.length > 0 && !selectedScent) {
  //       setSelectedScent(scents[0].id);
  //     }
  //     if (colors.length > 0 && !selectedColor) {
  //       setSelectedColor(colors[0].id);
  //     }
  //   }
  // }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  const scents = product ? parseScentsFromString(product.scent) : [];
  const colors = product ? parseColorsFromString(product.color) : [];
 
  const validateForm = () => {
    const newErrors = {};
    if (!selectedColor) newErrors.color = 'Colour is required';
    if (!selectedScent) newErrors.scent = 'Fragrance is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleAddToCart = () => {
     if (!validateForm()) return;
    const cartItem = {
      product: product._id, // required ObjectId reference
      quantity: quantity,
      colour: scents.find((s) => s.id === selectedScent), // string
      scent: colors.find((c) => c.id === selectedColor), // string
      price: product.price, // number (always use DB price, not frontend value!)
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // const cartItem = {
    //   id: 'daisy-candle',
    //   name: 'Daisy Candle',
    //   price: 40.00,
    //   originalPrice: 100.00,
    //   scent: scents.find(s => s.id === selectedScent),
    //   color: colors.find(c => c.id === selectedColor),
    //   quantity: quantity,
    //   image: '/api/placeholder/300/300'
    // };

    // Simulate adding to cart
    console.log("Added to cart:", cartItem);

    // Show success animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-500 mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="hover:text-amber-700"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-amber-700"
          >
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-amber-700"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <p className="text-amber-600 font-medium">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(127 reviews)</span>
                </div> */}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Burn Time</p>
                <p className="font-semibold">{product.burnTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-semibold">{product.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-semibold">{product.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scent Profile</p>
                <p className="font-semibold text-sm">{product.scent}</p>
              </div>
            </div>
            {/* Scent Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Scent
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {scents.map((scent) => (
                  <button
                    key={scent.id}
                    onClick={() => setSelectedScent(scent.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedScent === scent.id
                        ? "border-orange-400 bg-orange-50 text-orange-800"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm">{scent.name}</div>
                    <div className="text-xs text-gray-600">
                      {scent.description}
                    </div>
                  </button>
                ))}
              </div>
               {errors.scent && <p className="text-red-500 text-sm mt-1">{errors.scent}</p>}
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Color
              </h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`relative w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color.id
                        ? "border-orange-400 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.description}
                  >
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 rounded-full border-2 border-white shadow-lg"></div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {colors.find((c) => c.id === selectedColor)?.name}
              </p>
               {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? isAdded
                        ? "bg-green-600 text-white"
                        : "bg-amber-700 text-white hover:bg-amber-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      <span>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </>
                  )}
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </motion.button> */}
              </div>
             <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
    <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
    <span className="italic">For customization contact to us</span>
  </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "ingredients", "care"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-amber-700 text-amber-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.longDescription}
                    </p>
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "care" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Care Instructions
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          First Burn
                        </h4>
                        <p className="text-gray-700">
                          {product.careInstructions.firstBurn}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Wick Trimming
                        </h4>
                        <p className="text-gray-700">
                          {product.careInstructions.trimWick}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Safety</h4>
                        <p className="text-gray-700">
                          {product.careInstructions.safety}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <p className="text-gray-500">Reviews coming soon...</p>
                  </div>
                )} */}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
