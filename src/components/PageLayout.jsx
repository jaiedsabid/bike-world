import { memo } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const PageLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default memo(PageLayout);
