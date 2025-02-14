import React from 'react'; // Reactをインポート
import GuestLayout from '@/Layouts/GuestLayout'; // GuestLayoutをインポート
import { Head, Link, usePage } from '@inertiajs/react';

export default function MyProfile({ user }) {
    const { auth } = usePage().props;
    const currentUser = auth.user;

    return (
        <GuestLayout pageTitle="My Profile"> {/* GuestLayoutを使用して背景を設定 */}
            <Head title="My Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Name</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.name || '未設定'}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Favorite Work</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.favorite_work || '未設定'}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.bio || '未設定'}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Public Profile</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.is_public ? 'Yes' : 'No'}</p>
                        </div>

                        {currentUser.id === user.id && (
                            <div className="mt-4">
                                <Link href={route('profile.edit', { id: user.id })} className="text-blue-500 hover:underline">Edit Profile</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}