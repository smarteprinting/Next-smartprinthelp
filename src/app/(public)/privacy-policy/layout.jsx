export const metadata = {
  title: 'Privacy Policy',
  description: 'Read the Smart Print Help Privacy Policy. Learn how we collect, use, and protect your personal data when you use our services.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Smart Print Help',
    description: 'Read the Smart Print Help Privacy Policy. Learn how we collect, use, and protect your personal data when you use our services.',
    url: 'https://www.smartprinthelp.com/privacy-policy',
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
      'name': 'Privacy Policy',
      'item': 'https://www.smartprinthelp.com/privacy-policy'
    }
  ]
};

export default function PrivacyPolicyLayout({ children }) {
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
