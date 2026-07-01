"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { ChevronDown, Search, Loader2, Star, X, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/actions/productActions';
import { useImagePreload } from '../../lib/ImagePreloadContext';
import ProductImage from '../common/ProductImage';
import SEO from '../common/SEO';

const ITEMS_PER_PAGE = 9;

const ShopMain = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedUsageCategory, setSelectedUsageCategory] = useState([]);
  const [selectedWireless, setSelectedWireless] = useState('');
  const [selectedMainFunction, setSelectedMainFunction] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Use global image preload context (images start preloading on app mount)
  const { getImageUrl: getProductImageUrl } = useImagePreload();

  const productList = useSelector((state) => state.productList);
  const { allProducts = [], allLoading: loading, allError: error, allLoaded } = productList;

  // Filter options
  const brands = ['Brother', 'Canon', 'Epson', 'HP'];
  const technologies = ['Inkjet', 'Laser', 'Laser (B/W)'];
  const usageCategories = [
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Photo', value: 'Photo' }
  ];
  const wirelessOptions = ['Yes', 'No'];
  const mainFunctions = ['Print', 'Scan', 'Copy', 'Fax', 'Print Only'];
  const ratings = [5, 4, 3, 2, 1];

  // Debounce search term (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // allProducts prefetched by App.jsx — only fetch if somehow missed
  useEffect(() => {
    if (!allLoaded) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allLoaded]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedBrand, selectedTechnology, selectedUsageCategory, selectedWireless, selectedMainFunction, selectedRating, priceRange, sortBy]);

  // Filter products client-side for instant UI
  const getFilteredProducts = () => {
    let filtered = allProducts;
    if (debouncedSearchTerm) {
      filtered = filtered.filter(p => p.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }
    if (selectedTechnology) {
      filtered = filtered.filter(p => Array.isArray(p.technology) ? p.technology.includes(selectedTechnology) : p.technology === selectedTechnology);
    }
    if (selectedUsageCategory.length > 0) {
      filtered = filtered.filter(p => Array.isArray(p.usageCategory) && selectedUsageCategory.some(cat => p.usageCategory.includes(cat)));
    }
    if (selectedWireless) {
      filtered = filtered.filter(p => p.wireless === selectedWireless);
    }
    if (selectedMainFunction.length > 0) {
      filtered = filtered.filter(p => Array.isArray(p.mainFunction) && selectedMainFunction.some(f => p.mainFunction.includes(f)));
    }
    return filtered;
  };

  const productsToShow = getFilteredProducts();

  // Handle URL query parameters on mount
  useEffect(() => {
    // Read URL parameters and set filters
    if (searchParams.has('search')) {
      setSearchTerm(searchParams.get('search'));
    }
    if (searchParams.has('technology')) {
      setSelectedTechnology(searchParams.get('technology'));
    }
    if (searchParams.has('usageCategory')) {
      setSelectedUsageCategory([searchParams.get('usageCategory')]);
    }
    if (searchParams.has('brand')) {
      setSelectedBrand(searchParams.get('brand'));
    }
  }, [searchParams]);

  const handleUsageCategoryChange = (category) => {
    setSelectedUsageCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };
  const handleMainFunctionChange = (func) => {
    setSelectedMainFunction((prev) =>
      prev.includes(func)
        ? prev.filter((f) => f !== func)
        : [...prev, func]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSortBy('');
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedTechnology('');
    setSelectedUsageCategory([]);
    setSelectedWireless('');
    setSelectedMainFunction([]);
    setSelectedRating(0);
    setPriceRange([0, 1000]);
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-xs ${
              i < Math.round(rating || 0) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const filteredByPrice = productsToShow.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const filteredByRatingUnsorted = filteredByPrice.filter(
    (p) => selectedRating === 0 || Math.round(p.rating || 0) >= selectedRating
  );

  const filteredByRating = [...filteredByRatingUnsorted].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0;
  });

  const itemsPerPage = ITEMS_PER_PAGE;
  const totalPages = Math.ceil(filteredByRating.length / itemsPerPage);
  const paginatedProducts = filteredByRating.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters =
    sortBy ||
    searchTerm ||
    selectedBrand ||
    selectedTechnology ||
    selectedUsageCategory.length > 0 ||
    selectedWireless ||
    selectedMainFunction.length > 0 ||
    selectedRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  return (
    <div className="min-h-screen bg-white">
      <SEO
          title="Shop Printers & Supplies"
          description="Browse our full collection of inkjet, laser, and all-in-one printers. Filter by brand, technology, and price. Free shipping on orders."
          canonical="/shop"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Shop Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop</h1>
        <hr className="border-gray-300 mb-6" />

        {/* Top Bar - Results count and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-gray-500 text-sm">
            Showing {filteredByRating.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredByRating.length)} of {filteredByRating.length} results
          </p>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-600 cursor-pointer"
          >
            <option value="">Default sorting</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-square mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 font-semibold text-lg">Error loading products</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Products Grid - 3 columns */}
        {!loading && filteredByRating.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {paginatedProducts.map((product) => {
              const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
              return (
                <Link
                  key={product._id}
                  href={`/product/${product.slug || product._id}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4">
                    {hasSale && (
                      <span className="absolute top-3 left-3 z-10 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                        Sale!
                      </span>
                    )}
                    <ProductImage
                      src={getProductImageUrl(product) || '/assets/printer.png'}
                      alt={product.title}
                      width="320"
                      height="320"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    {product.category?.name || 'Uncategorized'}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {hasSale && (
                      <span className="text-gray-400 text-sm line-through">
                        ${product.oldPrice?.toFixed(2)}
                      </span>
                    )}
                    <span className="text-gray-900 text-sm font-bold">
                      ${product.price?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredByRating.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination - Numbered squares */}
        {!loading && totalPages > 1 && filteredByRating.length > 0 && (
          <div className="flex items-center gap-1 pb-12">
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);
              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              // Add previous page button if not on first page
              if (currentPage > 1) {
                pages.push(
                  <button
                    key="prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ←
                  </button>
                );
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-colors ${
                      currentPage === i
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (endPage < totalPages) {
                pages.push(
                  <button
                    key="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    →
                  </button>
                );
              }

              return pages;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMain;
