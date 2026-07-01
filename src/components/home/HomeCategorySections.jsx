"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "../common/ProductImage";
import { useImagePreload } from "../../lib/ImagePreloadContext";

/* ─── Config ──────────────────────────────────────────────────── */
const SECTIONS = [
  {
    key: "home",
    label: "Home Printers",
    description:
      "Compact and easy-to-use printers perfect for schoolwork, photos, and everyday documents. Seamlessly print from any device in the house.",
    params: { usageCategory: "Home", limit: 12, page: 1 },
    shopLink: "/product-category/home-printers",
  },
  {
    key: "office",
    label: "Office Printers",
    description:
      "Engineered for heavy workloads and multi-user efficiency. Experience rapid speeds, advanced security, and professional-grade reliability.",
    params: { usageCategory: "Office", limit: 12, page: 1 },
    shopLink: "/product-category/office-printers",
  },
  {
    key: "inkjet",
    label: "Inkjet Printers",
    description:
      "The ultimate choice for high-resolution photos and creative projects. Delivers rich, fluid colors on a wide variety of paper types.",
    params: { technology: "Inkjet", limit: 12, page: 1 },
    shopLink: "/product-category/inkjet-printers",
  },
  {
    key: "laser",
    label: "Laser Printers",
    description:
      "Built for speed and precision. Ideal for text-heavy documents and high-volume printing with a lower cost-per-page and zero smudging.",
    params: { technology: "Laser", limit: 12, page: 1 },
    shopLink: "/product-category/laser-printers",
  },
  {
    key: "ink-toner",
    label: "Ink & Toner",
    description:
      "Keep your printer running smoothly with genuine ink and toner. Ensure vibrant output and maximum page yields for every project.",
    params: { category: "Ink & Toner", limit: 12, page: 1 },
    shopLink: "/product-category/ink-toner",
  },
];

/* ─── Fetch helper ────────────────────────────────────────────── */
async function fetchSection(params) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, v);
  });
  const res = await fetch(`/api/products?${qs.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

/* ─── Single product card ─────────────────────────────────────── */
function ProductCard({ product }) {
  const { getImageUrl } = useImagePreload();
  const hasSale =
    product.oldPrice > 0 && product.oldPrice > product.price;

  const imgSrc =
    getImageUrl(product) ||
    (product.images?.[0] || "/assets/printer.png");

  const href = `/product/${product.slug || product._id}`;

  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className="relative bg-white w-full aspect-square overflow-hidden flex items-center justify-center mb-4 rounded-sm">
        {hasSale && (
          <span className="absolute top-2 left-2 z-10 bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
            Sale!
          </span>
        )}
        <ProductImage
          src={imgSrc}
          alt={product.title}
          width="300"
          height="300"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
        />
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#EF4056] transition-colors">
        {product.title}
      </h3>

      {/* Category label */}
      {product.category && (
        <p className="text-xs text-gray-400 mb-2">
          {typeof product.category === "object"
            ? product.category.name
            : product.category}
        </p>
      )}

      {/* Price */}
      <div className="flex items-center gap-2">
        {hasSale && (
          <span className="text-gray-400 text-sm line-through">
            ${product.oldPrice?.toFixed(2)}
          </span>
        )}
        <span className="text-gray-900 text-sm font-bold">
          ${product.price?.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}

/* ─── Skeleton loader (4 cols × 2 rows) ──────────────────────── */
function SectionSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-square w-full rounded-sm mb-4" />
          <div className="h-3 bg-gray-200 rounded mb-2 w-4/5" />
          <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

/* ─── One section ─────────────────────────────────────────────── */
function CategorySection({ section }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchSection(section.params)
      .then((data) => {
        if (cancelled) return;
        // API may return { products, pages, page } or { data: { products } }
        const list =
          data?.products ||
          data?.data?.products ||
          [];
        setProducts(list.slice(0, 12));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [section.key]);

  if (!loading && !error && products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      {/* Section header */}
      <div className="flex items-start justify-between mb-2">
        <div className="max-w-lg">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {section.label}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            {section.description}
          </p>
        </div>

        <Link
          href={section.shopLink}
          className="hidden sm:inline-flex shrink-0 items-center gap-1 border border-[#EF4056] text-[#EF4056] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#EF4056] hover:text-white transition-colors duration-200 mt-1"
        >
          EXPLORE ALL PRODUCTS →
        </Link>
      </div>

      {/* Mobile explore link */}
      <div className="sm:hidden mb-4">
        <Link
          href={section.shopLink}
          className="inline-flex items-center gap-1 border border-[#EF4056] text-[#EF4056] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#EF4056] hover:text-white transition-colors duration-200"
        >
          EXPLORE ALL PRODUCTS →
        </Link>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-4">
          Failed to load products. Please refresh.
        </p>
      )}

      {/* Loading skeleton */}
      {loading && <SectionSkeleton />}

      {/* Product grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-8">
          {products.map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function HomeCategorySections() {
  return (
    <div className="w-full bg-white">
      {SECTIONS.map((section) => (
        <React.Fragment key={section.key}>
          <CategorySection section={section} />
          {/* Divider between sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
            <hr className="border-gray-100" />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
