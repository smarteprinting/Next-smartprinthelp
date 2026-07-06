import DynamicModelSearch from '@/components/printer-setup/DynamicModelSearch';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Model Search | ${resolvedParams.brand} Smart App`,
  };
}

export default function Page() {
  return <DynamicModelSearch />;
}
