import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../firebase/firebase.init';

export const withProtectedRoute = (Component) => (props) => {
    const [user, loading] = useAuthState(firebaseAuth);
    const location = useLocation();
    const navigate = useNavigate();

    if (!user && !loading) {
        return navigate('/login', { state: { from: location } });
    }

    return user ? <Component {...props} /> : null;
};
