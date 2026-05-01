import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50">
      <div className="relative flex items-center justify-center">
        {/* Main Heartbeat Line Animation */}
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="text-blue-600"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,20 20,20 30,5 40,35 50,20 70,20 80,5 90,35 100,20 120,20"
            className="animate-[dash_1.5s_linear_infinite]"
            style={{
              strokeDasharray: '200',
              strokeDashoffset: '200',
            }}
          />
        </svg>
        {/* Glow Effect Background */}
        <div className="absolute h-12 w-32 bg-blue-100 blur-2xl opacity-50"></div>
      </div>
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;