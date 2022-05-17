import React from 'react';

const Spinner = () => {
  return (
    <svg className="w-20 h-20 mx-auto animate-spin-slow" viewBox="0 0 50 50">
      <circle
        className="[stroke-linecap:round] stroke-primaryText animate-[dash_1.5s_ease-in-out_infinite,_color_1.5s_ease-in-out_infinite]"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};

export default Spinner;
