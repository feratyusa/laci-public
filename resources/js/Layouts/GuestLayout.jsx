import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-200">
            <div>
                <Link href="/">
                    <ApplicationLogo className='h-20 w-20'/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-red-900 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
