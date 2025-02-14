import React from "react";
import { Head } from "@inertiajs/react";

const Show = ({ user }) => {
    return (
        <div style={{ padding: "20px" }}>
            <Head title={`${user.name}のプロフィール`} />
            <h1>{user.name}のプロフィール</h1>
            <p>好きな作品: {user.favorite_work || '未設定'}</p>
            <p>自己紹介: {user.bio || '未設定'}</p>
        </div>
    );
};

export default Show;