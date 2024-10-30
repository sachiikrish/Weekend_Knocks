'use client';

import React, { useState } from 'react';
import axios from 'axios';
import logo from '@/assets/logo.png';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import logobg from '@/assets/login_bg.jpg';
import dotenv from 'dotenv';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    dotenv.config();
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();  // Prevents page refresh on form submission
        setError('');  // Reset any previous errors

        try {
            const response = await axios.post(`${baseURL}/login/`, {
                email,
                password
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.access_token);
            alert("Login successful!");
            // Redirect or do additional steps post-login as needed

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.detail || "Login failed");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <div>
            <Navbar />

            {/* Background with blur effect */}
            <div
                style={{
                    backgroundImage: `url(${logobg.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    filter: 'blur(8px)',
                    zIndex: -1,
                }}
            ></div>

            <div className="flex justify-center items-center min-h-screen px-4 pt-20 pb-8 my-[3em]">
                <div className="w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex justify-center mx-auto mb-6">
                        <img src={logo.src} alt="Logo" className="w-20 h-20" />
                    </div>

                    <form className="mt-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-200">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}

                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:bg-blue-500 focus:outline-none">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
                        or login with Social Media
                    </div>

                    <div className="flex items-center mt-4 space-x-4">
                        <button type="button" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                            <span className="hidden sm:inline">Sign in with Google</span>
                        </button>

                        <button type="button" className="p-2 text-sm font-medium text-gray-500 bg-gray-300 rounded-lg hover:bg-gray-200">
                            {/* Social media icon */}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-gray-700 dark:text-gray-300">
                        Don't have an account? <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Create One</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
