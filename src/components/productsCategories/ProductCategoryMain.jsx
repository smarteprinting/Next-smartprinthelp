"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/actions/productActions';
import { useImagePreload } from '../../lib/ImagePreloadContext';
import ProductImage from '../common/ProductImage';
import SEO from '../common/SEO';

const ITEMS_PER_PAGE = 9;

/* ─── Slug → filter mapping ───────────────────────────────────── */
const CATEGORY_MAP = {
  'home-printers':   { label: 'Home Printers',  filter: { usageCategory: 'Home' } },
  'office-printers': { label: 'Office Printers', filter: { usageCategory: 'Office' } },
  'inkjet-printers': { label: 'Inkjet Printers', filter: { technology: 'Inkjet' } },
  'laser-printers':  { label: 'Laser Printers',  filter: { technology: 'Laser' } },
  'ink-toner':       { label: 'Ink & Toner',     filter: { categoryName: 'Ink & Toner' } },
};

/* ─── Description copy ────────────────────────────────────────── */
const DESCRIPTIONS = {
  'home-printers':   'Compact and easy-to-use printers perfect for schoolwork, photos, and everyday documents.',
  'office-printers': 'Engineered for heavy workloads and multi-user efficiency. Professional-grade reliability.',
  'inkjet-printers': 'High-resolution photos and creative projects. Rich, fluid colors on a wide variety of paper types.',
  'laser-printers':  'Built for speed and precision. Ideal for text-heavy documents with a lower cost-per-page.',
  'ink-toner':       'Keep your printer running smoothly with genuine ink and toner cartridges.',
};

export default function ProductCategoryMain({ slug }) {
  const dispatch = useDispatch();
  const { getImageUrl } = useImagePreload();

  const { allProducts = [], allLoading: loading, allError: error, allLoaded } = useSelector(
    (state) => state.productList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');

  // Fetch all products if not already cached
  useEffect(() => {
    if (!allLoaded) dispatch(fetchAllProducts());
  }, [dispatch, allLoaded]);

  // Reset to page 1 when sort or slug changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug, sortBy]);

  const categoryConfig = CATEGORY_MAP[slug];

  // Apply filter based on the slug
  const filteredProducts = useMemo(() => {
    if (!categoryConfig) return [];
    const { filter } = categoryConfig;
    let list = allProducts;

    if (filter.usageCategory) {
      list = list.filter(
        (p) =>
          Array.isArray(p.usageCategory)
            ? p.usageCategory.includes(filter.usageCategory)
            : p.usageCategory === filter.usageCategory
      );
    }
    if (filter.technology) {
      list = list.filter(
        (p) =>
          Array.isArray(p.technology)
            ? p.technology.includes(filter.technology)
            : p.technology === filter.technology
      );
    }
    if (filter.categoryName) {
      list = list.filter(
        (p) =>
          p.category?.name?.toLowerCase() === filter.categoryName.toLowerCase()
      );
    }

    // Sort
    if (sortBy === 'lowToHigh') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'highToLow') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [allProducts, slug, sortBy, categoryConfig]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const label = categoryConfig?.label || 'Products';
  const description = DESCRIPTIONS[slug] || '';

  /* ─── Pagination buttons ────────────────────────────────────── */
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) startPage = Math.max(1, endPage - maxVisible + 1);

    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => setCurrentPage(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
          ←
        </button>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)}
          className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-colors ${
            currentPage === i ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}>
          {i}
        </button>
      );
    }
    if (endPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => setCurrentPage(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
          →
        </button>
      );
    }
    return <div className="flex items-center gap-1 pb-12">{pages}</div>;
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={label}
        description={description}
        canonical={`/product-category/${slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{label}</span>
        </nav>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{label}</h1>
        <hr className="border-gray-300 mb-6" />

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-gray-500 text-sm">
            {loading
              ? 'Loading...'
              : `Showing ${filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–${Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProducts.length
                )} of ${filteredProducts.length} results`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-600 cursor-pointer"
          >
            <option value="">Default sorting</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-square mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 font-semibold text-lg">Error loading products</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Invalid category */}
        {!loading && !categoryConfig && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-gray-900 mb-2">Category not found</p>
            <Link href="/shop" className="text-[#EF4056] underline">Browse all products</Link>
          </div>
        )}

        {/* Products grid */}
        {!loading && categoryConfig && paginatedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {paginatedProducts.map((product) => {
              const hasSale = product.oldPrice > 0 && product.oldPrice > product.price;
              return (
                <Link key={product._id} href={`/product/${product.slug || product._id}`} className="group block">
                  <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4">
                    {hasSale && (
                      <span className="absolute top-3 left-3 z-10 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                        Sale!
                      </span>
                    )}
                    <ProductImage
                      src={getImageUrl(product) || '/assets/printer.png'}
                      alt={product.title}
                      width="320"
                      height="320"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {product.category?.name || label}
                  </p>
                  <div className="flex items-center gap-2">
                    {hasSale && (
                      <span className="text-gray-400 text-sm line-through">${product.oldPrice?.toFixed(2)}</span>
                    )}
                    <span className="text-gray-900 text-sm font-bold">${product.price?.toFixed(2) || '0.00'}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && categoryConfig && filteredProducts.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">No products available in this category yet.</p>
            <Link href="/shop" className="text-[#EF4056] underline">Browse all products</Link>
          </div>
        )}

        {/* Pagination */}
        {!loading && renderPagination()}
      </div>
    </div>
  );
}
