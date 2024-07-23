import DialogFile from '@/Components/DialogFile';
import HeaderTitle from '@/Components/HeaderTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, proposals, events, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title={'dashboard'}/>}
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="flex flex-col gap-5">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
