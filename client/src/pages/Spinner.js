import React from 'react';

const Spinner = () => {
  return (
    /* inset - 0 shorthand for top: 0; left: 0; right: 0; bottom: 0; */ 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Rotating Inner Circle */}
        <div
          className="w-12 h-12 rounded-full border-4 border-solid"
          style={{
            borderTopColor: '#FFFFFF', // Darker color for the top
            borderRightColor: 'transparent', // Transparent right side
            borderBottomColor: '#F5F5F5', // Lighter color for the bottom
            borderLeftColor: 'transparent', // Transparent left side
            animation: 'spin 1s linear infinite', // Apply animation
          }}    
        ></div>
    </div>
  );
};

export default Spinner;
