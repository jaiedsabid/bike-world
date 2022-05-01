import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundRedirect from './components/NotFoundRedirect';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import SignInSignUp from './pages/SignInSignUp';

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
                <Route key="login" path="/login" element={<SignInSignUp />} />
                <Route
                    key="register"
                    path="/register"
                    element={<SignInSignUp register />}
                />
                <Route path="/404" element={<NotFound404 />} />
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </div>
    );
};

export default App;
