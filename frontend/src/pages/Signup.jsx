import React, { useState } from 'react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); re

        // Simple validation and message display
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setMessage('All fields are required.');
            setIsError(true);
        } else if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            setIsError(true);
        } else {
            // Simulating a successful sign up
            setMessage('Sign up successful! Welcome.');
            setIsError(false);
            console.log('Sign up attempt with:', { name, email, password });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden relative">
            {/* Styles for special effects, embedded for single-file use */}
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    /* Static gradient with deeper, more dramatic colors */
                    background: linear-gradient(135deg, #020815, #001f4d, #043657);
                }

                .signup-container {
                    backdrop-filter: blur(15px);
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                }
                
                .signup-input {
                    background-color: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                .signup-input:focus {
                    border-color: #00CCFF;
                    box-shadow: 0 0 0 2px rgba(0, 204, 255, 0.5);
                }

                .signup-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                .signup-button {
                    background: #005f9c;
                    transition: all 0.3s ease;
                }

                .signup-button:hover {
                    background: #003e66;
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }
                
                .show-password-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.6);
                    transition: color 0.2s ease-in-out;
                }

                .show-password-btn:hover {
                    color: #00CCFF;
                }
                `}
            </style>
            
            {/* Raised project name in the background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 className="text-[10rem] font-black text-blue-950 opacity-10 drop-shadow-lg transform -rotate-6">
                    Blue Carbon
                </h1>
            </div>

            {/* Sign Up Container */}
            <div className="signup-container w-full max-w-sm p-8 rounded-2xl text-white relative z-10">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-center drop-shadow-lg">Sign Up</h1>
                    <p className="text-sm text-center opacity-80 drop-shadow">Create your account to start tracking.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm font-semibold text-white drop-shadow-sm block mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="signup-input w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-white drop-shadow-sm block mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="signup-input w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-semibold text-white drop-shadow-sm block mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signup-input w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off">
                                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.76 9.76 0 0 0 5.46-1.39" />
                                        <line x1="2" x2="22" y1="2" y2="22" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 flex flex-col space-y-2">
                        <button
                            type="submit"
                            className="signup-button w-full text-white font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center text-sm font-medium">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-300 hover:text-white font-bold transition-colors duration-300">
                            Login
                        </a>
                    </p>
                </div>
                {message && (
                    <div
                        className={`mt-4 text-center text-sm font-medium transition-all duration-300 transform scale-100 opacity-100 ${isError ? 'text-red-400' : 'text-green-400'}`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
