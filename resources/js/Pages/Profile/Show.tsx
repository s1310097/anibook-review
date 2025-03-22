import React from "react";
import { Head } from "@inertiajs/react";

type User = {
    name: string;
    favorite_work?: string;
    bio?: string;
    [key: string]: any;
};

type Field = {
    label: string;
    key: string;
};

type ProfileProps = {
    title?: string;
    user: User;
    fields: Field[];
};

const Profile: React.FC<ProfileProps> = ({ title, user, fields }) => {
    return (
        <div style={{ padding: "20px" }}>
            <Head title={title || `${user.name}のプロフィール`} />
            <h1>{title || `${user.name}のプロフィール`}</h1>
            {fields.map((field, index) => (
                <p key={index}>{field.label}: {user[field.key] || '未設定'}</p>
            ))}
        </div>
    );
};

export default Profile;
