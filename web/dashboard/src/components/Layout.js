import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
