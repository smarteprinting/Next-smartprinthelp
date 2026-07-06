import ClientLayout from '@/components/printer-setup/ClientLayout';

export const metadata = {
  title: {
    template: '%s',
  },
};

export default function PrinterSetupLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
