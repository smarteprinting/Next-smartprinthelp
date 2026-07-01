import Home from '@/components/printer-setup/Home';

export const metadata = {
  title: '123 Printer Setup, Driver Download & Offline Fix | Smart Print Help',
  description: 'Step-by-step setup assistant to configure your new printer, download latest driver packages, connect to Wi-Fi, and resolve printer offline status. Setup support for HP, Canon, Epson, and Brother printers.',
  keywords: [
    'printer setup', 'download printer drivers', 'install printer software', 
    'wireless printer setup', 'connect printer to wifi', 'fix printer offline', 
    'hp smart app setup', 'canon print setup', 'epson smart setup', 
    'brother utility drivers', 'printer setup assistant', '123 printer setup'
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
    canonical: 'https://www.smartprinthelp.com/printer-setup',
  },
};

export default function Page() {
  return <Home />;
}
