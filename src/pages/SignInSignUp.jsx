import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSendPasswordResetEmail,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase/firebase.init';
import { API_BASE_URL, getAPIRoute } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner';

// External CSS
import 'react-toastify/dist/ReactToastify.css';

const SignInSignUp = ({ register }) => {
    const [stateValue, setStateValue] = useState({
        email: '',
        password: '',
        fullName: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const fromURL = location.state ? location.state.from : '/';
    const [user] = useAuthState(firebaseAuth);
    const [signInWithEmailAndPassword, , signInloading, signInError] =
        useSignInWithEmailAndPassword(firebaseAuth);
    const [signInWithGoogle, , googleLoginLoading, googleLoginError] =
        useSignInWithGoogle(firebaseAuth);
    const [
        createUserWithEmailAndPassword,
        ,
        createAccountLoading,
        createAccountLError,
    ] = useCreateUserWithEmailAndPassword(firebaseAuth, {
        sendEmailVerification: true,
    });
    const [updateProfile, updating] = useUpdateProfile(firebaseAuth);
    const [sendPasswordResetEmail, sending, resetPasswordError] =
        useSendPasswordResetEmail(firebaseAuth);
    const pageConfig = {
        register: {
            title: 'Sign up for an account',
            buttonText: 'Sign up',
            switchPageTitle: 'Already have an account?',
        },
        login: {
            title: 'Sign in to your account',
            buttonText: 'Sign in',
            switchPageTitle: "Don't have an account?",
        },
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setStateValue({ ...stateValue, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, fullName } = stateValue;

        if (register) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: fullName });
        } else {
            await signInWithEmailAndPassword(email, password);
        }
    };

    const handleForgetPassword = async () => {
        if (sending) {
            return;
        }

        if (!stateValue.email) {
            return displayToast('Please enter your email address', 'error');
        }

        await sendPasswordResetEmail(stateValue.email);
        displayToast('Password reset email sent');
    };

    const handleAccessToken = async (email) => {
        const URL = getAPIRoute(API_BASE_URL, 'LOGIN');
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: email }),
            });
            const data = await response.json();
            if (data?.accessToken && typeof data?.accessToken === 'string') {
                localStorage.setItem('access-token', data.accessToken);
            }
        } catch (error) {
            // Do nothing
        }
    };

    const handleSuccessLogin = async () => {
        if (user) {
            await handleAccessToken(user.email);
            navigate(fromURL, { replace: true });
        }
    };

    const displayToast = (message, type = 'success') => {
        toast[type](message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        let errorMsg = '';

        if (!register && signInError) {
            errorMsg = 'Invalid email or password';
        } else if (!register && googleLoginError) {
            errorMsg = 'Google login failed';
        } else if (
            register &&
            createAccountLError &&
            createAccountLError?.code === 'auth/email-already-in-use'
        ) {
            errorMsg = 'Email already in use';
        } else if (
            register &&
            createAccountLError &&
            createAccountLError?.code === 'auth/weak-password'
        ) {
            errorMsg = 'Password is too weak';
        } else {
            errorMsg = '';
        }

        if (
            (errorMsg && signInError && Object.keys(signInError).length) ||
            (googleLoginError && Object.keys(googleLoginError).length) ||
            (createAccountLError && Object.keys(createAccountLError).length)
        ) {
            displayToast(errorMsg, 'error');
        }
    }, [
        signInError,
        googleLoginError,
        createAccountLError,
        resetPasswordError,
    ]);

    useEffect(() => {
        handleSuccessLogin();
    }, [user]);

    return (
        <>
            <div className="min-h-full flex relative">
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                {
                                    pageConfig[register ? 'register' : 'login']
                                        .title
                                }
                            </h2>
                        </div>

                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Sign in with
                                    </p>

                                    <div className="mt-1 grid grid-cols-1 gap-3">
                                        <div>
                                            <button
                                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                onClick={() =>
                                                    signInWithGoogle()
                                                }
                                            >
                                                <span className="sr-only">
                                                    Sign in with Google
                                                </span>
                                                <svg
                                                    className="h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86Z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div
                                        className="absolute inset-0 flex items-center"
                                        aria-hidden="true"
                                    >
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    {register && (
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Full Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="fullName"
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <Link
                                                to={
                                                    register
                                                        ? '/login'
                                                        : '/register'
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-500"
                                            >
                                                {
                                                    pageConfig[
                                                        register
                                                            ? 'register'
                                                            : 'login'
                                                    ].switchPageTitle
                                                }
                                            </Link>
                                        </div>

                                        {!register && (
                                            <div className="text-sm">
                                                <button
                                                    type="button"
                                                    className="font-medium text-blue-600 hover:text-blue-500"
                                                    onClick={
                                                        handleForgetPassword
                                                    }
                                                >
                                                    Forgot your password?
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            {
                                                pageConfig[
                                                    register
                                                        ? 'register'
                                                        : 'login'
                                                ].buttonText
                                            }
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-10 flex justify-center">
                                    <Link
                                        className="text-sm font-normal italic text-gray-300 hover:text-blue-500 text-center"
                                        to="/"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/bike-1.jpg"
                        alt="Yamaha"
                    />
                </div>
                {(signInloading ||
                    googleLoginLoading ||
                    createAccountLoading ||
                    updating ||
                    sending) && <Spinner />}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default SignInSignUp;
