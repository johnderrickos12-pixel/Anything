import React from 'react';

interface EndScreenProps {
  onRestartGame: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onRestartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-4xl md:text-6xl font-extrabold text-pink-500 mb-8 animate-pulse">
        The Journey Continues...
      </h2>
      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-2xl">
        The echoes of your passion linger. Are you ready to dive back into the pursuit of desire?
      </p>
      <button
        onClick={onRestartGame}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Restart Passion Pursuit
      </button>
    </div>
  );
};

export default EndScreen;
