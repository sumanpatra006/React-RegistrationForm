import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function Profile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/register');
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  return (
    <div className='flex-col flex justify-center items-center my-auto mt-5.5'>
      <h1>Welcome to the website</h1>
      <p>After getting into here there are many more things to go </p>
      <p>Stay updated to know more....</p>
      <button onClick={handleSignOut} className='p-2 border-black border-2 rounded-full text-black' >Sign Out</button>
    </div>
  )
}

export default Profile
