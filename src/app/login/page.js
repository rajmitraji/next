'use client';

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  // We use window.location for navigation in this standalone example
  // instead of Next.js router to ensure it compiles in all environments.

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post('/api/users/login', user, {
        withCredentials: true,
      });

      toast.success(response.data?.message || 'Login successful');
      // Use window.location instead of router.push for compatibility
      window.location.href = '/profile';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('🔥 Axios Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Invalid email or password'
        );
      } else {
        console.error('🔥 Unknown Error:', error);
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !user.email || !user.password;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 bg-gradient-to-r from-indigo-900 via-sky-900 to-cyan-900">
      {/* Glassmorphism Container */}
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-[350px] transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />

          <input
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={isButtonDisabled || loading}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 
              ${
                isButtonDisabled || loading
                  ? 'bg-gray-500 opacity-50 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Replaced Next.js Link with standard anchor tag for compatibility */}
          <a
            href="/signup"
            className="text-sm text-cyan-300 hover:text-cyan-100 text-center transition-all mt-2"
          >
            Don&apos;t have an account? Signup
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
