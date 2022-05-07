import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.init';
import { Navigate } from 'react-router-dom';

const SignOut = () => {
    useEffect(() => {
        signOut(firebaseAuth);
        localStorage.clear();
    }, []);

    return <Navigate to="/login" />;
};

export default SignOut;
