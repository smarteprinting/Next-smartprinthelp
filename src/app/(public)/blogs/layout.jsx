export const metadata = {
  title: 'Blogs & Insights',
  description: 'Read the latest blogs, guides, printer maintenance tips, and industry insights from the printer experts at Smart Print Help.',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/blogs',
  },
  openGraph: {
    title: 'Blogs & Insights | Smart Print Help',
    description: 'Read the latest blogs, guides, printer maintenance tips, and industry insights from the printer experts at Smart Print Help.',
    url: 'https://www.smartprinthelp.com/blogs',
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
      'name': 'Blogs',
      'item': 'https://www.smartprinthelp.com/blogs'
    }
  ]
};

export default function BlogsLayout({ children }) {
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
