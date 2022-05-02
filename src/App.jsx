import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundRedirect from './components/NotFoundRedirect';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import InventoryItem from './pages/InventoryItem';
import NotFound404 from './pages/NotFound404';
import SignInSignUp from './pages/SignInSignUp';
import SignOut from './pages/SignOut';

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
                <Route
                    path="/inventory/:id"
                    element={
                        <PageLayout>
                            <InventoryItem />
                        </PageLayout>
                    }
                />
                <Route
                    path="/inventory"
                    element={
                        <PageLayout>
                            <Inventory />
                        </PageLayout>
                    }
                />
                <Route key="login" path="/login" element={<SignInSignUp />} />
                <Route
                    key="register"
                    path="/register"
                    element={<SignInSignUp register />}
                />
                <Route path="/logout" element={<SignOut />} />
                <Route path="/404" element={<NotFound404 />} />
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </div>
    );
};

export default App;
