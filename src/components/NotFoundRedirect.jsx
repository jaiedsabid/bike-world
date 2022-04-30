import { Navigate } from 'react-router-dom';

const NotFoundRedirect = () => {
    return <Navigate to="/404" />;
};

export default NotFoundRedirect;
