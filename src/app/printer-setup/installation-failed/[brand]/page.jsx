import InstallationFailedPage from '@/components/printer-setup/InstallationFailedPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Installation Failed | ${resolvedParams.brand} Smart App`,
  };
}

export default function Page() {
  return (
    <InstallationFailedPage />
  );
}
