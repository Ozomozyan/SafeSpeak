"use client"; // Add this at the very top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js'; // Import the crypto-js library
import Navbar from '@/components/navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    const secretKey = "mySecretKey"; // Use the same secret key for encryption

    // Function to hash the email
    const hashEmail = (email: string) => {
        return CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex); // Hash the email
    };

    // Function to encrypt the password
    const encryptPassword = (password: string) => {
        return CryptoJS.AES.encrypt(password, secretKey).toString(); // Encrypt the password
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            // Hash the email and encrypt the password before sending it
            const hashedEmail = hashEmail(email);
            const encryptedPassword = encryptPassword(password);

            const response = await fetch('http://localhost:9552/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: hashedEmail, password: encryptedPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login, redirect to homepage or dashboard
                console.log('User logged in with ID:', data.id);
                router.push('/accueil'); // Redirect to home page
            } else {
                setError(data.error); // Display error if login fails
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900"> {/* Dark background */}
            <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md"> {/* Dark card */}
                <h2 className="text-2xl font-bold text-center text-primary">Login</h2> {/* White text */}
                {error && <p className="text-red-400 text-sm text-center">{error}</p>} {/* Error in red */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="email"> {/* Light gray label */}
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Dark input with white text
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="password"> {/* Light gray label */}
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Dark input with white text
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`} // Darker button
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400">
                    Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
