import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// Helper function to query product
async function getProduct(id) {
  try {
    await connectDB();
    let product;

    // Try to find by ID first
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).populate('category', 'name');
    }

    // If not found by ID, try by slug
    if (!product) {
      product = await Product.findOne({ slug: id }).populate('category', 'name');
    }

    // Fallback: try fuzzy match by title
    if (!product) {
      const titlePattern = id.replace(/-/g, ' ');
      product = await Product.findOne({
        title: { $regex: new RegExp(`^${titlePattern}$`, 'i') },
      }).populate('category', 'name');
    }

    // Last resort: partial match
    if (!product) {
      const parts = id.split('-');
      const firstFewParts = parts.slice(0, Math.min(parts.length, 3)).join(' ');
      if (firstFewParts.length > 5) {
        product = await Product.findOne({
          title: { $regex: new RegExp(firstFewParts, 'i') },
        }).populate('category', 'name');
      }
    }

    return product;
  } catch (error) {
    console.error('Error fetching product for layout metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found on Smart Print Help.',
    };
  }

  const title = product.title;
  const description = product.shortDetails || product.description || `Buy ${product.title} online at Smart Print Help. Get genuine printer quality, fast shipping, and expert support.`;
  const categoryName = product.category?.name || 'Printers';
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : 'https://www.smartprinthelp.com/smart-print-help-logo.png';
  const slug = product.slug || product._id.toString();

  return {
    title,
    description,
    keywords: [product.title, product.brand || 'Smart Print Help', categoryName, 'buy printer online', 'Smart Print Help'],
    alternates: {
      canonical: `https://www.smartprinthelp.com/product/${slug}`,
    },
    openGraph: {
      title: `${title} | Smart Print Help`,
      description,
      url: `https://www.smartprinthelp.com/product/${slug}`,
      images: [
        {
          url: imageUrl,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Smart Print Help`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductLayout({ children, params }) {
  const { id } = await params;
  const product = await getProduct(id);

  let productSchema = null;
  let breadcrumbSchema = null;

  if (product) {
    const slug = product.slug || product._id.toString();
    const imageUrls = product.images && product.images.length > 0
      ? product.images
      : ['https://www.smartprinthelp.com/smart-print-help-logo.png'];

    productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.title,
      'image': imageUrls,
      'description': product.description || product.shortDetails || `${product.title} premium printer.`,
      'brand': {
        '@type': 'Brand',
        'name': product.brand || 'Smart Print Help'
      },
      'offers': {
        '@type': 'Offer',
        'url': `https://www.smartprinthelp.com/product/${slug}`,
        'priceCurrency': 'USD',
        'price': product.price || 0,
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Smart Print Help'
        }
      }
    };

    if (product.rating > 0 && product.numReviews > 0) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': product.rating,
        'reviewCount': product.numReviews
      };
    }

    breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.smartprinthelp.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Shop',
          'item': 'https://www.smartprinthelp.com/shop'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': product.title,
          'item': `https://www.smartprinthelp.com/product/${slug}`
        }
      ]
    };
  }

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {children}
    </>
  );
}
