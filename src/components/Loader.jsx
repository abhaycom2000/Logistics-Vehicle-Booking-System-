import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <svg
        className="w-20 h-20 text-blue-500 animate-[bounce_1.5s_ease-in-out_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="truckGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>

        <rect
          x="8"
          y="20"
          width="40"
          height="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="url(#truckGradient)"
          fill="url(#truckGradient)"
          filter="drop-shadow(0 1px 1px rgba(0,0,0,0.1))"
          rx="3"
        />
        <rect
          x="48"
          y="25"
          width="12"
          height="15"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="url(#truckGradient)"
          fill="url(#truckGradient)"
          rx="2"
        />
        <circle cx="20" cy="45" r="5" fill="#0f766e" stroke="#14532d" strokeWidth="1" />
        <circle cx="50" cy="45" r="5" fill="#0f766e" stroke="#14532d" strokeWidth="1" />
       
        <rect x="50" y="27" width="8" height="7" fill="rgba(255,255,255,0.5)" rx="1.5" />
      </svg>
    </div>
  )
}

export default Loader