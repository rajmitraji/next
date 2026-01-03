import React from 'react';
// import { Button } from 'react-bootstrap';

const UserProfile = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          User Profile
          
        </h1>

        {/* Highlighted User ID */}
        <div className="flex justify-center">
          <div className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
            <span className="text-white text-2xl font-bold tracking-wide">
              {id}
              
            </span>
          </div>
        </div>

        {/* Extra description (optional) */}
        <p className="mt-6 text-gray-500 text-lg">
          You are logged in as 
          <span className="ml-2 font-semibold text-gray-800">{id}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
