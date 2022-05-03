import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { firebaseAuth } from '../firebase/firebase.init';

export const withProtectedRoute = (Component) => (props) => {
    const location = useLocation();
    const [user, loading] = useAuthState(firebaseAuth);

    if (loading) {
        return null;
    }

    if (!user && !loading) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return user && !loading ? <Component {...props} /> : null;
};
