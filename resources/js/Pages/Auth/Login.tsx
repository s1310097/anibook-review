
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import "./Login.css";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

        
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontSize: '1.2em' }}> 
                <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Log in </h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '10vh' }}>
                    <div style={{ display: 'flex', alignItems: 'center' , width: '130%'}}>
                        <InputLabel htmlFor="email" value="Email" style={{ marginRight: '10px' , width: '60px'}}/>
                    
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your e-mail"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '10vh' }}>
                    <div style={{ display: 'flex', alignItems: 'center' , width: '130%'}}>
                        <InputLabel htmlFor="password" value="Password" style={{ marginRight: '10px' , width: '60px'}}/>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', justifyContent: 'flex-start', height: '10vh' }}>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember your imformation
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end flex-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '3vh' }}>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                         >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="mt-4" disabled={processing}
                        style={{ width: '100%', height: '50px', fontSize: '1.2em', backgroundColor: 'rgb(0, 82, 204)', color: 'white', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginBottom: '20px', padding: '10px', width: '100%' }}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
