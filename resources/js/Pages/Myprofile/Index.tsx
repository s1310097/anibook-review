import React from "react";
import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

const Index = ({ profiles }) => {
    return (
        <GuestLayout>
            <div style={{ padding: "20px" }}>
                <h1>プロフィール一覧</h1>
                <ul>
                    {profiles.map((profile) => (
                        <li key={profile.id}>
                            <Link href={`/profile/${profile.id}`}>{profile.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </GuestLayout>
    );
};

export default Index;