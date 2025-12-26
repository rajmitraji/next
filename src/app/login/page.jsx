'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();

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
      const response = await axios.post('/api/users/login', user);

      toast.success('Login successful');
      router.push('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
      console.error('Login error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !user.email || !user.password;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          className="p-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <input
          className="p-2 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        <Button type="submit" disabled={isButtonDisabled || loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Link href="/signup" className="text-blue-500 text-sm text-center">
          Don&apos;t have an account? Signup
        </Link>
      </form>
    </div>
  );
};

export default Login;
