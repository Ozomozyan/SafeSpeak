"use client";

import React, { useState } from 'react';
import CryptoJS from 'crypto-js'; // Import the crypto-js library

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
            }
        } catch (err) {
            console.error('Registration failed:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
