export const metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about ordering, shipping, returns, printer support, and services offered by Smart Print Help.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Smart Print Help',
    description: 'Find answers to common questions about ordering, shipping, returns, printer support, and services offered by Smart Print Help.',
    url: 'https://www.smartprinthelp.com/faq',
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
      'name': 'FAQ',
      'item': 'https://www.smartprinthelp.com/faq'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What is Smart Print Help?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Smart Print Help is an independent online store offering printers, inks, toners, and printing accessories across the United States and Canada. We provide genuine products, competitive prices, and expert customer support to make your printing experience simple and reliable.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Are the products sold by Smart Print Help genuine?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We only offer authentic and original products from trusted global brands. All trademarks and product names belong to their respective owners and are used for identification purposes only.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Is Smart Print Help affiliated with any printer brand?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'No, we are not directly affiliated with any printer brand. We are an independent retailer.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Do you ship outside the United States?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes. We currently ship to customers in both the United States and Canada. Delivery times and charges may vary depending on your location.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How can I track my order?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Once your order is shipped, you’ll receive a tracking number via email. You can use this number to monitor your shipment directly through the carrier’s website or our order-tracking page.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What payment methods do you accept?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'We accept all major credit and debit cards, as well as secure online payment options. All transactions are processed through encrypted payment gateways to protect your information.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is your return and refund policy?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'If you receive a damaged, defective, or incorrect product, please contact us within 7 days of delivery. Returns and refunds are processed according to our Return & Refund Policy, ensuring a fair and transparent resolution.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How can I contact Smart Print Help?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'You can reach our support team anytime Email: support@smartprinthelp.com Address: 23224 Crenshaw Blvd, Torrance, CA 90505'
      }
    },
    {
      '@type': 'Question',
      'name': 'Do you offer technical support for printer setup or issues?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes! Our expert support team is available 24/7 to help with printer setup, connection, and troubleshooting. You can reach out through live chat, email, or phone for quick assistance.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Why should I shop at Smart Print Help?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Because we make printing simple. You get genuine products, affordable pricing, fast shipping, and friendly support — all in one trusted place.'
      }
    }
  ]
};

export default function FAQLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
