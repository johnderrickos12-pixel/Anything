import React, { useState } from 'react';

interface PlayerSetupProps {
  onStartGame: (player1Name: string, player2Name: string) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Name.trim() && player2Name.trim()) {
      onStartGame(player1Name, player2Name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-pink-500 drop-shadow-lg animate-pulse">Passion Pursuit</h1>
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-pink-700 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-400">Enter Player Names</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="player1" className="block text-lg font-medium text-gray-300 mb-2">Player 1 Name:</label>
            <input
              type="text"
              id="player1"
              className="w-full px-5 py-3 bg-gray-700 border border-pink-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg text-pink-100 placeholder-pink-300 transition-all duration-200"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="e.g., Alex"
              required
            />
          </div>
          <div>
            <label htmlFor="player2" className="block text-lg font-medium text-gray-300 mb-2">Player 2 Name:</label>
            <input
              type="text"
              id="player2"
              className="w-full px-5 py-3 bg-gray-700 border border-pink-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg text-pink-100 placeholder-pink-300 transition-all duration-200"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="e.g., Jamie"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
          >
            Start Passion Pursuit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetup;
