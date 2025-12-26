'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
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

  useEffect(() => {
    setButtonDisable(!(user.email && user.username && user.password));
  }, [user]);

  const onSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post('/api/users/signup', user);

      toast.success(response.data.message || 'Signup successful');
      console.log("Signup Sucess", response.data);
      router.push('/login');

    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong during signup'
      );
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Signup Page</h1>

      <form onSubmit={onSignup} className="flex flex-col gap-3 w-72">
        <input
          className="p-2 border border-gray-300"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          className="p-2 border border-gray-300"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          className="p-2 border border-gray-300"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Button type="submit" disabled={buttonDisable || loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </Button>

        <Link href="/login" className="text-blue-500 text-sm">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
