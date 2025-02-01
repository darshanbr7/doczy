// Unauthorized.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to view this page. Please go back.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Home 
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
