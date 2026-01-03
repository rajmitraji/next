'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Checks if fields are filled to enable button
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const onSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post('/api/users/signup', user);
      toast.success(response.data.message || 'Signup successful');
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 w-[350px] transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40">
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Signup
        </h1>

        <form onSubmit={onSignup} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            disabled={buttonDisable || loading}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 
              ${
                buttonDisable || loading
                  ? 'bg-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <Link
            href="/login"
            className="text-sm text-purple-300 hover:text-purple-100 text-center transition-all mt-2"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
