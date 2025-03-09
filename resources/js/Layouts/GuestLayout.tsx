import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, pageTitle }) {
    return (
        <div style={{ backgroundColor: '#0073e6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}> {/* 親コンテナの背景色を青に設定 */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '200px', height: '200px', backgroundImage: 'url(/images/cat_norwegian_forest_cat_brown.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div> {/* 左上の写真 */}
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '200px', height: '200px', backgroundImage: 'url(/images/dog_corgi_tricolor.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div> {/* 右下の写真 */}
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '600px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', zIndex: 1 }}> {/* 中央のコンテンツの背景色を白に設定 */}
                {children}
            </div>

            <h2 style={{ position: 'absolute', top: '1%', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                anibook-review
            </h2>

            <h2 style={{ position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {pageTitle}
            </h2>
        </div>
    );
}