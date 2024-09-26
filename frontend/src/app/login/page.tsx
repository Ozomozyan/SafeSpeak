"use client"; // Add this at the very top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js'; // Import the crypto-js library

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
