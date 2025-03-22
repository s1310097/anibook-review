import React from 'react';
import { Link } from '@inertiajs/react';

const MenuBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg">
                    <Link href="/">Home</Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="/dashboard" className="text-white ml-4">Dashboard</Link>
                    <Link href="/myprofile" className="text-white ml-4">My Profile</Link>
                    <Link href="/works" className="text-white ml-4">Works</Link>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;