import Home from '@/components/printer-setup/Home';

export const metadata = {
  title: 'Printer Setup Help | Connect Printer & Fix Offline Issues',
  description: 'Get printer setup help to connect your printer to a computer or WiFi, install drivers, and troubleshoot offline or connection issues with step-by-step guidance.',
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
    canonical: 'https://www.smartprinthelp.com/printer-setup-and-troubleshooting',
  },
};

export default function Page() {
  return <Home />;
}
