export const metadata = {
    title: 'Cookies Policy',
    description: 'Read the Smart Print Help Cookies Policy. Learn how we collect, use, and protect your personal data when you use our services.',
    alternates: {
        canonical: 'https://www.smartprinthelp.com/cookies-policy',
    },
    openGraph: {
        title: 'Cookies Policy | Smart Print Help',
        description: 'Read the Smart Print Help Cookies Policy. Learn how we collect, use, and protect your personal data when you use our services.',
        url: 'https://www.smartprinthelp.com/cookies-policy',
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
            'name': 'Cookies Policy',
            'item': 'https://www.smartprinthelp.com/cookies-policy'
        }
    ]
};

export default function CookiesPolicyLayout({ children }) {
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
