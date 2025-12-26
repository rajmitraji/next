import React from 'react';

// : any ko hata diya gaya hai
const UserProfile = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <h1>Profile</h1>
      <p className="text-4xl">Profile Page <span className="font-bold p-2 rounded bg-orange-500 text-black">{id}</span> </p>
    </div>
  );
};

export default UserProfile;
