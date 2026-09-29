import ClientLayout from './ClientLayout';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.smartprinthelp.com'),
  title: {
    default: 'HP Printer Setup & HP Smart Help | Smart Print Help',
    template: '%s | Smart Print Help',
  },
  description:
    'Get help with HP printer setup, HP Smart setup, printer offline issues, WiFi connections, adding a printer to your computer, drivers and printing problems.',
  keywords: [
    'hp smart setup',
    'hp printer not connecting',
    'install hp smart',
    'hp printer offline',
    'install hp app',
    '123 hp com setup',
    'connect printer to wifi',
    'printer setup help',
    'connect printer to computer',
    'printer not connecting',
    'printer driver installation',
    'fix printer offline',
  ],
  authors: [{ name: 'Smart Print Help' }],
  creator: 'Smart Print Help',
  publisher: 'Smart Print Help',
  alternates: {
    canonical: 'https://www.smartprinthelp.com/printer-setup-troubleshooting/',
  },
  openGraph: {
    title: 'HP Printer Setup & HP Smart Help | Smart Print Help',
    description:
      'Get help with HP printer setup, HP Smart setup, printer offline issues, WiFi connections, adding a printer to your computer, drivers and printing problems.',
    url: 'https://www.smartprinthelp.com/printer-setup-troubleshooting/',
    siteName: 'Smart Print Help',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HP Printer Setup & HP Smart Help | Smart Print Help',
    description:
      'Get help with HP printer setup, HP Smart setup, printer offline issues, WiFi connections, adding a printer to your computer, drivers and printing problems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.smartprinthelp.com/#organization',
      name: 'Smart Print Help',
      url: 'https://www.smartprinthelp.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-855-618-4642',
        contactType: 'customer support',
        areaServed: 'US',
        availableLanguage: 'en',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.smartprinthelp.com/#website',
      url: 'https://www.smartprinthelp.com',
      name: 'Smart Print Help',
      publisher: {
        '@id': 'https://www.smartprinthelp.com/#organization',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.smartprinthelp.com/printer-setup-troubleshooting/#webpage',
      url: 'https://www.smartprinthelp.com/printer-setup-troubleshooting/',
      name: 'HP Printer Setup & HP Smart Help | Smart Print Help',
      description:
        'Get help with HP printer setup, HP Smart setup, printer offline issues, WiFi connections, adding a printer to your computer, drivers and printing problems.',
      isPartOf: {
        '@id': 'https://www.smartprinthelp.com/#website',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.smartprinthelp.com/printer-setup-troubleshooting/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I set up my HP printer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Prepare the printer, connect it to WiFi or your computer, install the appropriate HP software or driver from an official HP source, add the printer in your device settings, and run a test print.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I set up my printer with HP Smart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Turn on the supported HP printer, enable wireless networking, open HP Smart on a compatible device, choose the option to add or set up a printer, and follow the on-screen instructions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I install HP Smart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use an official HP source or your device's official app store, install HP Smart on a compatible device, open it, and follow the prompts to add or set up your supported printer.",
          },
        },
        {
          '@type': 'Question',
          name: "Why can't HP Smart find my printer?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Check that the printer is powered on, wireless networking is enabled, and the printer and your device are using the appropriate network. Restart the printer and router before trying again.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I connect my HP printer to WiFi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Open the printer's wireless or network settings, select your WiFi network, enter the network password, and wait for the printer to confirm the connection.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why is my HP printer not connecting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Identify whether the problem is with WiFi or the computer connection. Check the network, password, USB or network connection, printer status, and appropriate printer software.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is my HP printer offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Check the printer's power, WiFi or USB connection, print queue, selected printer, and installed software. A network change can also cause a previously connected printer to appear offline.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I fix a printer offline issue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Check the connection, restart the printer and computer, clear stuck print jobs, confirm the correct printer is selected, and reconnect the printer if necessary.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I connect a printer to my computer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Connect the printer through WiFi, USB, Ethernet, or another supported method, then open Printers & Scanners and add the printer.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I add a printer to my computer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Open your computer's Printers & Scanners settings, choose Add Printer or Add Device, select the printer, and follow the setup prompts.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I install an HP printer driver?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Identify your exact HP printer model and operating system, then use an official HP resource to obtain the appropriate software or driver and follow the installation instructions.',
          },
        },
      ],
    },
  ],
};

export default function PrinterSetupLayout({ children }) {
  return (
    <>
      {/* ClickCease Script */}
      <Script
        id="clickcease-script"
        src="https://ob.sornavellon.com/i/6cd83818f302977b2729291478f5574c.js"
        strategy="afterInteractive"
      />

      {/* Google tag (gtag.js) */}
      <Script
        id="gtag-js"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18114921677"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-inline-printer-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18114921677');`,
        }}
      />

      {/* SEO JSON-LD Structured Data Schema */}
      <Script
        id="seo-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      <noscript>
        <iframe
          src="https://ob.sornavellon.com/ns/6cd83818f302977b2729291478f5574c.html?ch="
          width="0"
          height="0"
          style={{ display: 'none' }}
        ></iframe>
      </noscript>

      <ClientLayout>{children}</ClientLayout>
    </>
  );
}