"use client"; // Marks this as a client-side component

import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // Clear any session data (e.g., localStorage, sessionStorage, or cookies)
        localStorage.removeItem('userId'); // Remove stored user information (if any)

        // Optional: You can call a backend route for logout, but it's not necessary
        // await fetch('http://localhost:9552/auth/logout', {
        //     method: 'POST',
        //     credentials: 'include',
        // });

        // Redirect to the login page
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-secondary">
            Logout
        </button>
    );
};

export default Logout;
