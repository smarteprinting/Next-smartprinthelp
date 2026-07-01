import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap() {
  const baseUrl = 'https://www.smartprinthelp.com';

  // Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/blogs',
    '/contact-us',
    '/disclaimer',
    '/faq',
    '/privacy-policy',
    '/cookies-policy',
    '/return-refund-policy',
    '/shipping-policy',
    '/shop',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.7,
  }));

  // Fetch dynamic products from database
  let productEntries = [];
  try {
    await connectDB();
    const products = await Product.find({}, 'slug updatedAt').lean();
    productEntries = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug || product._id.toString()}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return [...staticRoutes, ...productEntries];
}
