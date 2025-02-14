import React from "react";
import { Link } from "@inertiajs/react";

const Index = ({ profiles }) => {
    return (
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
    );
};

export default Index;