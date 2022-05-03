import Footer from './Footer';
import Navbar from './Navbar';

const PageLayout = ({ Component }) => {
    return (
        <>
            <Navbar />
            <Component />
            <Footer />
        </>
    );
};

export default PageLayout;
