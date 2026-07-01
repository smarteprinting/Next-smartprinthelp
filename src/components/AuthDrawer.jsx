"use client";
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ArrowRight, Loader2, Mail, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, sendRegistrationOTP, verifyRegistrationOTP, forgotPassword, resetPassword } from '../redux/actions/userActions';
import { USER_AUTH_CLEAR_MESSAGES } from '../redux/constants/userConstants';

const AuthDrawer = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'verify-otp', 'forgot-password', 'reset-password'
    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Messages
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector((state) => state.userLogin);
    const { loading: loadingSendOTP, error: errorSendOTP, success: successSendOTP } =
        useSelector((state) => state.userSendOTP);
    const { loading: loadingVerifyOTP, error: errorVerifyOTP, success: successVerifyOTP } =
        useSelector((state) => state.userVerifyOTP);
    const { loading: loadingForgot, error: errorForgot, success: successForgot } =
        useSelector((state) => state.userForgotPassword);
    const { loading: loadingReset, error: errorReset, success: successReset } =
        useSelector((state) => state.userResetPassword);

    const resetTransientState = (nextMode = 'login') => {
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setMode(nextMode);
        setShowPassword(false);
        setSuccessMessage(null);
        setErrorMessage(null);
        setOtp('');
    };

    const handleClose = () => {
        resetTransientState('login');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
            setSuccessMessage(null);
            setErrorMessage(null);
        }
    }, [dispatch, isOpen]);

    /* ---------------- LOGIN SUCCESS ---------------- */
    useEffect(() => {
        if (userInfo) {
            setSuccessMessage('Login Successful! Redirecting...');
            const timer = setTimeout(() => {
                dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
                setMode('login');
                setShowPassword(false);
                setSuccessMessage(null);
                setErrorMessage(null);
                setOtp('');
                onClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, onClose, userInfo]);

    /* ---------------- SUBMIT ---------------- */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setErrorMessage(null);
        setSuccessMessage(null);

        if (mode === 'signup') {
            if (password.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(sendRegistrationOTP(firstName, lastName, email.trim(), password));
            }
        } else if (mode === 'verify-otp') {
            dispatch(verifyRegistrationOTP(email.trim(), otp));
        } else if (mode === 'forgot-password') {
            dispatch(forgotPassword(email.trim()));
        } else if (mode === 'reset-password') {
            if (newPassword.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (newPassword !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(resetPassword(email.trim(), otp, newPassword));
            }
        } else {
            dispatch(login(email.trim(), password));
        }
    };

    /* ---------------- OTP SENT ---------------- */
    useEffect(() => {
        if (successSendOTP) {
            setMode('verify-otp');
            setSuccessMessage('OTP sent to your email.');
        }
    }, [successSendOTP]);

    /* ---------------- OTP VERIFIED ---------------- */
    useEffect(() => {
        if (successVerifyOTP) {
            setMode('login');
            setSuccessMessage('OTP verified successfully! Please login.');
            setOtp('');
        }
    }, [successVerifyOTP]);

    /* ---------------- FORGOT PASSWORD ---------------- */
    useEffect(() => {
        if (successForgot) {
            setMode('reset-password');
            setSuccessMessage('OTP sent to your email for password reset.');
        }
    }, [successForgot]);

    /* ---------------- PASSWORD RESET ---------------- */
    useEffect(() => {
        if (successReset) {
            setMode('login');
            setSuccessMessage('Password reset successfully! Please login.');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [successReset]);

    /* ---------------- ERRORS ---------------- */
    useEffect(() => {
        if (error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset) {
            setErrorMessage(
                error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset
            );
        }
    }, [error, errorSendOTP, errorVerifyOTP, errorForgot, errorReset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-sm rounded-lg shadow-lg relative animate-in zoom-in-95 duration-200">
                <X
                    className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-700"
                    onClick={handleClose}
                    size={20}
                />

                {/* HEADER - show title based on mode */}
                {(mode === 'login' || mode === 'forgot-password') && (
                    <div className="pt-6 px-6 pb-0"></div>
                )}
                {(mode === 'signup' || mode === 'verify-otp') && (
                    <div className="pt-6 px-6 pb-0">
                        <h3 className="text-lg font-bold text-gray-900">Create Account</h3>
                    </div>
                )}

                {/* ERROR MESSAGE */}
                {errorMessage && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                        {errorMessage}
                    </div>
                )}

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-medium">
                        {successMessage}
                    </div>
                )}

                <div className="p-6 space-y-4">
                    {mode === 'login' && (
                        /* Login Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Username or Email Address</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 accent-[#EF4056]"
                                />
                                <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#EF4056] hover:bg-[#d93548] text-white px-8 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-70"
                            >
                                {loading ? 'Logging in...' : 'LOG IN'}
                            </button>
                            <div className="flex items-center justify-between text-sm pt-1">
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('forgot-password')}
                                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                                >
                                    Lost your password?
                                </button>
                            </div>
                            <div className="border-t pt-4 text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('signup')}
                                    className="text-[#EF4056] font-bold hover:underline cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'signup' && (
                        /* Signup Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingSendOTP}
                                className="bg-[#EF4056] hover:bg-[#d93548] text-white px-8 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-70"
                            >
                                {loadingSendOTP ? 'Sending OTP...' : 'SIGN UP'}
                            </button>
                            <div className="border-t pt-4 text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('login')}
                                    className="text-[#EF4056] font-bold hover:underline cursor-pointer"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'verify-otp' && (
                        /* OTP Verification Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Mail className="text-[#EF4056]" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    We've sent a 6-digit OTP to <strong>{email}</strong>
                                </p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="000000"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-center text-lg font-mono"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingVerifyOTP || otp.length !== 6}
                                className="w-full bg-[#EF4056] hover:bg-[#d93548] text-white py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-70"
                            >
                                {loadingVerifyOTP ? 'Verifying...' : 'Verify & Create Account'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                Didn't receive OTP?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('signup')}
                                    className="text-[#EF4056] font-bold hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'forgot-password' && (
                        /* Forgot Password Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Mail className="text-[#EF4056]" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Enter your email address and we'll send you a reset code
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingForgot}
                                className="w-full bg-[#EF4056] hover:bg-[#d93548] text-white py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-70"
                            >
                                {loadingForgot ? 'Sending...' : 'Send Reset Code'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                Remember your password?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('login')}
                                    className="text-[#EF4056] font-bold hover:underline"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'reset-password' && (
                        /* Reset Password Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Key className="text-[#EF4056]" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Enter the OTP sent to <strong>{email}</strong> and your new password
                                </p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="000000"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-center text-lg font-mono"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">New Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-gray-500 transition-colors text-sm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingReset || otp.length !== 6}
                                className="w-full bg-[#EF4056] hover:bg-[#d93548] text-white py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-70"
                            >
                                {loadingReset ? 'Resetting...' : 'Reset Password'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('forgot-password')}
                                    className="text-[#EF4056] font-bold hover:underline"
                                >
                                    Try different email
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="absolute inset-0 -z-10" onClick={handleClose} onKeyDown={(e) => e.key === 'Escape' && handleClose()} role="button" tabIndex={-1} aria-label="Close dialog"></div>
        </div>
    );
};

export default AuthDrawer;
