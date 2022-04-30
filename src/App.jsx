import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/blog" element={<h1>Blog</h1>} />
            </Routes>
        </div>
    );
};

export default App;
