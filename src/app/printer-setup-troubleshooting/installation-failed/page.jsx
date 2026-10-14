import Header from '../Header';
import InstallationFailed from './InstallationFailed';
import ConversionTracker from './ConversionTracker';

export const metadata = {
    title: 'Printer Driver Installation Error',
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <>
            <ConversionTracker />
            <Header />
            <InstallationFailed />
        </>
    );
}