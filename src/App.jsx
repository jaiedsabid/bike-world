import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundRedirect from './components/NotFoundRedirect';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageLayout>
                            <Home />
                        </PageLayout>
                    }
                />
                <Route path="/blog" element={<h1>Blog</h1>} />
                <Route path="/404" element={<NotFound404 />} />
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </div>
    );
};

export default App;
