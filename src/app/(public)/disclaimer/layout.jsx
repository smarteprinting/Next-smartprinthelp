export const metadata = {
  title: 'Disclaimer',
  description: 'Read the disclaimer and legal policy for Smart Print Help. Learn about our independent retailer status and website usage terms.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Smart Print Help',
    description: 'Read the disclaimer and legal policy for Smart Print Help. Learn about our independent retailer status and website usage terms.',
    url: 'https://www.smartprinthelp.com/disclaimer',
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
      'name': 'Disclaimer',
      'item': 'https://www.smartprinthelp.com/disclaimer'
    }
  ]
};

export default function DisclaimerLayout({ children }) {
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
