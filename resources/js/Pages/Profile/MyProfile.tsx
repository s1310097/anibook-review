import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps, User } from "@/types"; // 必要な型をインポート

interface Props {
  user: User;
}

export default function MyProfile({ user }: { user: User }) {
    const { auth } = usePage<PageProps>().props;
    const currentUser = auth.user;

    return (
        <GuestLayout pageTitle="My Profile">
            <Head title="My Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Name</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.name || "未設定"}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Favorite Work</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.favorite_work || "未設定"}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.bio || "未設定"}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Public Profile</h3>
                            <p className="mt-1 text-sm text-gray-600">{user.is_public ? "Yes" : "No"}</p>
                        </div>

                        {currentUser.id === user.id && (
                            <div className="mt-4">
                                <Link
                                    href={route("profile.edit", { id: user.id })}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
