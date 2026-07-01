export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Smart Print Help support team. Email support@smartprinthelp.com, or visit us in Torrance, MN.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/contact-us',
  },
  openGraph: {
    title: 'Contact Us | Smart Print Help',
    description: 'Get in touch with the Smart Print Help support team. Email support@smartprinthelp.com, or visit us in Torrance, MN.',
    url: 'https://www.smartprinthelp.com/contact-us',
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
      'name': 'Contact Us',
      'item': 'https://www.smartprinthelp.com/contact-us'
    }
  ]
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact Smart Print Help',
  'description': 'Contact page for Smart Print Help customer service and technical support.',
  'url': 'https://www.smartprinthelp.com/contact-us',
  'mainEntity': {
    '@type': 'Store',
    'name': 'Smart Print Help',

    'email': 'support@smartprinthelp.com',
    'image': 'https://www.smartprinthelp.com/smart-print-help-logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '23224 Crenshaw Blvd',
      'addressLocality': 'Torrance',
      'addressRegion': 'MN',
      'postalCode': '90505',
      'addressCountry': 'US'
    }
  }
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
