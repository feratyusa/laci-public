import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input } from '@material-tailwind/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className='flex flex-col gap-2 my-5'>
                <div>
                    <InputLabel value="Username" for="username" 
                        className="text-white font-bold text-lg" />

                    <TextInput 
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        autoComplete="username"
                        isFocused={true}
                        className="bg-red-50 border-0 focus:bg-white"
                        onChange={(e) => setData('username', e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" color='white' iconSize='5' textSize='sm'/>
                </div>

                <div className="mt-4">
                    <InputLabel value="Password" for="password" 
                        className="text-white font-bold text-lg" />

                    <TextInput 
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="password"
                        isFocused={false}
                        className="bg-red-50 border-0 focus:bg-white"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" color='white' iconSize='5' textSize='sm'/>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-white">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-white hover:text-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <Button className="ms-4" color="white" type='submit'>
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
