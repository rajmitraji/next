'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout', {
        withCredentials: true,
      });
      console.log('Logout response:', response.data);
      // Redirect to login page after logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/me');
        setUser(res.data.data);
      } catch (error) {
        console.error('Profile fetch error', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[350px] text-center">
        <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

        {user ? (
          <>
            <p className="text-lg">
              <span className="ml-2 px-3 py-1 bg-orange-500 text-white rounded-full font-semibold">
                {user.username || user.email}
              </span>
            </p>
            <br />
            <button onClick={logout} className="hover:bg-blue-500 hover:text-white transition mt-4 w-full px-4 py-2 bg-red-300 text-red-800 font-semibold rounded-lg">
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
