"use client";

import React, { useState } from 'react';
import CryptoJS from 'crypto-js'; // Import the crypto-js library
import Navbar from '@/components/navbar'; // Adjust the import path as necessary

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const secretKey = "mySecretKey"; // Use a secret key for encryption (keep this secret)

    // Function to hash the email
    const hashEmail = (email: string) => {
        return CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex); // Hash the email
    };

    // Function to encrypt the password
    const encryptPassword = (password: string) => {
        return CryptoJS.AES.encrypt(password, secretKey).toString(); // Encrypt the password
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Hash the email and encrypt the password
            const hashedEmail = hashEmail(email);
            const encryptedPassword = encryptPassword(password);

            // Send hashed email and encrypted password to the backend
            const response = await fetch('http://localhost:9552/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: hashedEmail, password: encryptedPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Failed to register');
            } else {
                setSuccess('User registered successfully!');
                setEmail(''); // Clear email input on successful registration
                setPassword(''); // Clear password input on successful registration
            }
        } catch (err) {
            console.error('Registration failed:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar /> {/* Include the Navbar here */}
            <div className="flex-grow flex items-center justify-center bg-gray-900"> {/* Dark background */}
                <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md"> {/* Dark card */}
                    <h2 className="text-2xl font-bold text-center text-white">Register</h2> {/* White text */}
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>} {/* Error in red */}
                    {success && <p className="text-green-400 text-sm text-center">{success}</p>} {/* Success in green */}
                    <form onSubmit={handleRegister} className="space-y-4">
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
                            className="w-full p-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-md" // Button styling
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-400">
                        Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
