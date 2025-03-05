import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import "./EditProfile.css";

const EditProfile = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        favorite_work: user.favorite_work || "",
        bio: user.bio || "",
        is_public: user.is_public || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("profile.update", { id: user.id }), {
            onSuccess: () => {
                // データが更新された後に自動的に profile.show にリダイレクト
                window.location.href = route("profile.show", { id: user.id });
            },
        });
    };
    

    return (
        <GuestLayout pageTitle="Edit Profile">
            <Head title="Edit Profile" />
            <div className="edit-profile-container">
                <h1 className="edit-profile-title">プロフィール編集</h1>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div>
                        <label className="edit-profile-label">名前:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="edit-profile-input"
                        />
                        {errors.name && <p className="edit-profile-error">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="edit-profile-label">好きな作品:</label>
                        <input
                            type="text"
                            value={data.favorite_work}
                            onChange={(e) => setData("favorite_work", e.target.value)}
                            className="edit-profile-input"
                        />
                        {errors.favorite_work && <p className="edit-profile-error">{errors.favorite_work}</p>}
                    </div>
                    <div>
                        <label className="edit-profile-label">自己紹介:</label>
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                            className="edit-profile-textarea"
                        />
                        {errors.bio && <p className="edit-profile-error">{errors.bio}</p>}
                    </div>
                    <div className="edit-profile-checkbox-container">
                        <input
                            type="checkbox"
                            checked={data.is_public}
                            onChange={(e) => setData("is_public", e.target.checked)}
                            className="edit-profile-checkbox"
                        />
                        <label className="edit-profile-label">公開プロフィール</label>
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`edit-profile-button ${processing ? "disabled" : ""}`}
                    >
                        {processing ? "保存中..." : "保存"}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
};

export default EditProfile;
