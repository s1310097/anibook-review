import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 既存のページ
import SearchPage from "../js/Pages/Work/Index";
import DetailPage from "../js/Pages/Review/Index";

// 🔹 追加: レビュー作成ページ
import CreateReview from "../js/Pages/Review/CreateReview";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Router>
                <Routes>
                    {/* 🔹 作品検索ページ */}
                    <Route path="/works" element={<SearchPage />} />

                    {/* 🔹 レビュー一覧ページ */}
                    <Route path="/works/:workId/:workType/reviews" element={<DetailPage />} />

                    {/* 🔹 レビュー作成ページを追加 */}
                    <Route path="/works/:workId/:workType/reviews/create" element={<CreateReview />} />
                </Routes>

                {/* 🔹 Inertia.js のコンポーネント */}
                <App {...props} />
            </Router>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
