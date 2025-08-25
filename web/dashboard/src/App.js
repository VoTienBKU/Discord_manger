import React from 'react';
import Layout from './components/Layout';
import ServerList from './components/ServerList';

function App() {
    return (
        <Layout>
            <div className="space-y-4 md:space-y-6">

                <ServerList />
            </div>
        </Layout>
    );
}

export default App;
