import CompleteSetup from '@/components/printer-setup/CompleteSetup';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Complete Setup | ${resolvedParams.brand} Smart App`,
  };
}

export default function Page() {
  return <CompleteSetup />;
}
