import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundRedirect from './components/NotFoundRedirect';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import InventoryItem from './pages/InventoryItem';
import MyItems from './pages/MyItems';
import NotFound404 from './pages/NotFound404';
import SignInSignUp from './pages/SignInSignUp';
import SignOut from './pages/SignOut';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/inventory/:id" element={<InventoryItem />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/my-items" element={<MyItems />} />
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
