import React from 'react';
import Layout from './components/Layout';
import ServerList from './components/ServerList';

function App() {
    return (
        <Layout>
            <div className="space-y-4 md:space-y-6">
                <div className="bg-white rounded-lg shadow-soft p-4 md:p-6 border border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Discord Servers
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                        Quản lý và theo dõi các Discord servers của bạn
                    </p>
                </div>
                <ServerList />
            </div>
        </Layout>
    );
}

export default App;
