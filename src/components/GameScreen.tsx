import React, { useState, useEffect } from 'react';
import { Player, Card as CardType, GameState, IntensityLevel } from '../types';
import Card from './Card';

interface GameScreenProps {
  players: Player[];
  onGameOver: () => void;
}

const initialCards: { [key in IntensityLevel]: CardType[] } = {
  Intimate: [
    { type: 'Dare', text: 'Share your most embarrassing childhood memory.' },
    { type: 'Question', text: 'What do you find most attractive in a partner?' },
    { type: 'Command', text: 'Hold hands with your partner for the next 5 minutes.' },
    { type: 'Dare', text: 'Whisper a secret desire into your partner's ear.' },
    { type: 'Question', text: 'What is your favorite romantic memory?' },
    { type: 'Command', text: 'Give your partner a sincere compliment.' },
    { type: 'Dare', text: 'Gaze into your partner's eyes for 60 seconds without breaking.' },
    { type: 'Question', text: 'What quality do you admire most about your partner?' },
    { type: 'Command', text: 'Trace your finger gently along your partner's arm.' },
  ],
  Passionate: [
    { type: 'Dare', text: 'Give your partner a slow, sensual kiss.' },
    { type: 'Question', text: 'What is your biggest turn-on?' },
    { type: 'Command', text: 'Massage your partner's shoulders for two minutes.' },
    { type: 'Dare', text: 'Describe a fantasy you'd like to fulfill with your partner.' },
    { type: 'Question', text: 'What is your favorite non-sexual way to feel close to your partner?' },
    { type: 'Command', text: 'Caress your partner's cheek gently.' },
    { type: 'Dare', text: 'Kiss your partner's neck for 30 seconds.' },
    { type: 'Question', text: 'What makes you feel most desired?' },
    { type: 'Command', text: 'Run your fingers through your partner's hair.' },
  ],
  Ecstatic: [
    { type: 'Dare', text: 'Give your partner a full-body massage using only your hands and lips.' },
    { type: 'Question', text: 'What is your most adventurous sexual fantasy?' },
    { type: 'Command', text: 'Undress your partner slowly, one item at a time.' },
    { type: 'Dare', text: 'Blindfold your partner and pleasure them for five minutes.' },
    { type: 'Question', text: 'What is the most daring thing you've ever done sexually?' },
    { type: 'Command', text: 'Experience intense pleasure together, orally or manually.' },
    { type: 'Dare', text: 'Take off one piece of your clothing.' },
    { type: 'Question', text: 'What is your ultimate turn-on that you rarely get to experience?' },
    { type: 'Command', text: 'Engage in a passionate make-out session for two minutes.' },
  ],
};

const GameScreen: React.FC<GameScreenProps> = ({ players, onGameOver }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayerIndex: 0,
    currentIntensity: 'Intimate',
    drawnCards: [],
    score: players.map(() => 0),
  });
  const [currentCard, setCurrentCard] = useState<CardType | null>(null);
  const [message, setMessage] = useState<string>('');

  const nextPlayer = () => {
    setGameState((prev) => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % players.length,
    }));
  };

  const drawCard = () => {
    const availableCards = initialCards[gameState.currentIntensity].filter(
      (card) => !gameState.drawnCards.some((drawn) => drawn.text === card.text)
    );

    if (availableCards.length === 0) {
      if (gameState.currentIntensity === 'Ecstatic') {
        setMessage("All cards played in Ecstatic level! Game Over!");
        setTimeout(onGameOver, 3000);
        return;
      }
      // Move to next intensity level if all cards are drawn in current level
      const intensityLevels: IntensityLevel[] = ['Intimate', 'Passionate', 'Ecstatic'];
      const nextIntensityIndex = intensityLevels.indexOf(gameState.currentIntensity) + 1;
      const nextIntensity = intensityLevels[nextIntensityIndex];

      if (nextIntensity) {
        setGameState((prev) => ({
          ...prev,
          currentIntensity: nextIntensity,
          drawnCards: [], // Reset drawn cards for the new level
        }));
        setMessage(`Moving to ${nextIntensity} level!`);
        setTimeout(() => drawCard(), 2000); // Draw a new card after message
        return;
      }
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const newCard = availableCards[randomIndex];

    setCurrentCard(newCard);
    setGameState((prev) => ({
      ...prev,
      drawnCards: [...prev.drawnCards, newCard],
    }));
    setMessage('');
  };

  const handleCardCompletion = () => {
    setGameState((prev) => {
      const newScore = [...prev.score];
      newScore[prev.currentPlayerIndex] += 1;
      return { ...prev, score: newScore };
    });
    nextPlayer();
    drawCard();
  };

  useEffect(() => {
    drawCard(); // Initial card draw
  }, [gameState.currentIntensity]); // Redraw when intensity changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-4xl font-bold mb-6">Passion Pursuit</h2>
      <div className="text-xl mb-4">
        Current Player: <span className="text-pink-400 font-semibold">{players[gameState.currentPlayerIndex].name}</span>
      </div>
      <div className="text-lg mb-8">
        Intensity Level: <span className="text-purple-400 font-semibold">{gameState.currentIntensity}</span>
      </div>

      {message && <p className="text-yellow-400 text-2xl mb-4 animate-pulse">{message}</p>}

      <div className="w-full max-w-md">
        {currentCard && <Card card={currentCard} />}
      </div>

      <button
        onClick={handleCardCompletion}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-600 text-white text-2xl font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-700 transition duration-300 transform hover:scale-105"
      >
        Next Card
      </button>

      <div className="mt-8 text-xl">
        Scores:
        {players.map((player, index) => (
          <span key={index} className="ml-4 text-purple-300">
            {player.name}: {gameState.score[index]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
