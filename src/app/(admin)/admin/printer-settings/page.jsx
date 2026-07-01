import SettingsManagement from '@/components/printer-setup/SettingsManagement';

export const metadata = {
  title: 'Printer Setup Settings | Admin Dashboard',
};

export default function AdminPrinterSettingsPage() {
  return (
    <div className="p-6">
      <SettingsManagement />
    </div>
  );
}
