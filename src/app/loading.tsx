import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      {/* Loading animation Full Screen */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 transition-opacity duration-300">
        <div className="flex w-full transform flex-col items-center justify-center rounded-lg text-center text-white transition-all duration-300">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="relative flex space-x-2">
              <div className="animate-wave h-4 w-4 rounded-full bg-sky-400"></div>
              <div className="animate-wave h-4 w-4 rounded-full bg-sky-400 delay-200"></div>
              <div className="animate-wave delay-400 h-4 w-4 rounded-full bg-sky-400"></div>
              <div className="animate-wave delay-600 h-4 w-4 rounded-full bg-sky-400"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
