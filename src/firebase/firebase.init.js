// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCSbKtxKvHPiIuDNwyWDZMSWGfTL5hUkeo',
    authDomain: 'bike-world-4bc7b.firebaseapp.com',
    projectId: 'bike-world-4bc7b',
    storageBucket: 'bike-world-4bc7b.appspot.com',
    messagingSenderId: '780497825118',
    appId: '1:780497825118:web:87a7d827d660eedd7ef3cf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
