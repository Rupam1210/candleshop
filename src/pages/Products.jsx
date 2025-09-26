import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Filter, Search, Grid, List } from "lucide-react";
import { productsAPI } from "../services/api";
import { showError } from "../utils/toast";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
//   // console.log(totalPages)

//   let count = totalPages;
//   //  filter?count= Math.ceil(filter.length/16):count=totalPages;
//   // Generate page numbers (you can improve for large number of pages)
//   for (let i = 1; i <= count; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex justify-center my-8">
//       <nav className="inline-flex space-x-1">
//         {/* Previous Button */}
//         <button
//           onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
//           className={`px-3 py-1 rounded-md border ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           Previous
//         </button>

//         {/* Page Numbers */}
//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-3 py-1 rounded-md border ${
//               currentPage === page
//                 ? "bg-orange-500 text-white border-orange-500"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         {/* Next Button */}
//         <button
//           onClick={() =>
//             currentPage < totalPages && onPageChange(currentPage + 1)
//           }
//           className={`px-3 py-1 rounded-md border ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           Next
//         </button>
//       </nav>
//     </div>
//   );
// };
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    if (currentPage > 3) {
      pages.push(1, "...");
    }

    // Show 2 pages before and after current
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      pages.push("...", totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center my-8">
      <nav className="inline-flex space-x-1">
        {/* Previous */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`px-3 py-1 rounded-full border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                currentPage === page
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={`px-3 py-1 rounded-full border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

const Products = memo(() => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [viewMode, setViewMode] = useState("grid");
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { loadProducts } = useProducts();
  
  const [searchParams, setSearchParams] = useSearchParams();
 

  // Read current page from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  // Update URL when currentPage changes
   const handlePageChange = (page) => {
    if (page !== currentPage) {
      setSearchParams({ page: page.toString() });
    }
  };

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);
  useEffect(() => {
    loadProduct();
    loadProducts({ page: currentPage, limit: 16 });
  }, [currentPage]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll({
        page: currentPage,
        limit: 16,
      });
      // console.log(response.data);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages);
      setTotalProducts(response.data.pagination.totalProducts);
    } catch (error) {
      showError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdate = useCallback((updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.scent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy, priceRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {loading ? (
        <LoadingSpinner text="Loading products..." size="large" />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of handcrafted candles, each one
              designed to create the perfect ambiance for any moment.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-smflex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg gap-3">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {filteredProducts.length} Products
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-amber-700 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-amber-700 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>

            {/* Filters Panel */}
            <motion.div
              initial={false}
              animate={{
                height: showFilters ? "auto" : 0,
                opacity: showFilters ? 1 : 0,
              }}
              className={`${
                showFilters ? "block" : "hidden"
              } md:block bg-white p-6 rounded-lg shadow-sm space-y-6`}
            >
              {/* Category Filters */}
              {/* <div>
                <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-amber-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-amber-50 border border-gray-300"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div> */}

              {/* Price Range */}
              {/* <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 min-w-[80px]">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>
              </div> */}
            </motion.div>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }`}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id || product.id}
                variants={itemVariants}
              >
                <ProductCard product={product} onUpdate={handleProductUpdate} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg mb-4">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setPriceRange([0, 100]);
                }}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        filter={filteredProducts}
      />
    </motion.div>
  );
});

Products.displayName = "Products";

export default Products;
