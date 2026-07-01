export const metadata = {
  title: 'Shop Printers & Accessories',
  description: 'Browse and shop high-quality printers, ink, toner, and accessories at Smart Print Help. Competitive pricing, genuine brands, and free shipping.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/shop',
  },
  openGraph: {
    title: 'Shop Printers & Accessories | Smart Print Help',
    description: 'Browse and shop high-quality printers, ink, toner, and accessories at Smart Print Help. Competitive pricing, genuine brands, and free shipping.',
    url: 'https://www.smartprinthelp.com/shop',
  },
};

const breadcrumbSchema = {
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
    }
  ]
};

export default function ShopLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
