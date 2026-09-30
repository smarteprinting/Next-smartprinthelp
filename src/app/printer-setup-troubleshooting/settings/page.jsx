import HPSettingsManagement from './HPSettingsManagement';

export const metadata = {
  title: 'HP Printer Setup Settings | Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HPAdminSettingsPage() {
  return (
    <div className="p-6">
      <HPSettingsManagement />
    </div>
  );
}
