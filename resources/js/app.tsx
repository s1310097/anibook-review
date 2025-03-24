import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MenuBarコンポーネントをインポート
import MenuBar from './Components/MenuBar';

// 既存のページ
import SearchPage from "../js/Pages/Work/Index";
import DetailPage from "../js/Pages/Review/Index";
import CreateReview from "../js/Pages/Review/CreateReview"; // CreateReviewコンポーネント

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
                <MenuBar />
                <Routes>
                    <Route path="/works" element={<SearchPage />} />
                    <Route path="/works/:workId/:workType/reviews" element={<DetailPage />} />
                    <Route path="/works/:workId/:workType/reviews/create" element={<CreateReview />} />
                </Routes>
                <App {...props} />
            </Router>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
