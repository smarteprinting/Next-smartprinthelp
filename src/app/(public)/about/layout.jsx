export const metadata = {
  title: 'About Us',
  description: 'Learn about Smart Print Help, a registered independent online retailer based in Torrance, CA, specializing in professional printing solutions.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/about',
  },
  openGraph: {
    title: 'About Us | Smart Print Help',
    description: 'Learn about Smart Print Help, a registered independent online retailer based in Torrance, CA, specializing in professional printing solutions.',
    url: 'https://www.smartprinthelp.com/about',
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
      'name': 'About Us',
      'item': 'https://www.smartprinthelp.com/about'
    }
  ]
};

export default function AboutLayout({ children }) {
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
