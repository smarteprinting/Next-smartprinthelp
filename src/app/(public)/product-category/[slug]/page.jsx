"use client";
import { useParams } from 'next/navigation';
import ProductCategoryMain from '@/components/productsCategories/ProductCategoryMain';

export default function ProductCategoryPage() {
  const { slug } = useParams();
  return <ProductCategoryMain slug={slug} />;
}
