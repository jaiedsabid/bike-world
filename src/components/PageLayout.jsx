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

export default PageLayout;
