import Home from './Home';

export const metadata = {
  title: 'HP Printer Setup & HP Smart Help | Smart Print Help',
  description: 'Get help with HP printer setup, HP Smart setup, printer offline issues, WiFi connections, adding a printer to your computer, drivers and printing problems.',
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
    'fix printer offline'
  ],
  authors: [{ name: 'Smart Print Help' }],
  creator: 'Smart Print Help',
  publisher: 'Smart Print Help',
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
  alternates: {
    canonical: 'https://www.smartprinthelp.com/printer-setup-troubleshooting/',
  },
};

export default function Page() {
  return <Home />;
}
