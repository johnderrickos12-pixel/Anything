import React, { useState, useEffect } from 'react';

type Player = {
  name: string;
  score: number;
};

type Card = {
  id: string;
  type: 'dare' | 'question' | 'command';
  text: string;
  intensity: 'intimate' | 'passionate' | 'ecstatic';
};

const cards: Card[] = [
  // Intimate
  { id: '1', type: 'dare', text: 'Whisper something seductive in your partner's ear.', intensity: 'intimate' },
  { id: '2', type: 'question', text: 'What's one fantasy you've always wanted to explore?', intensity: 'intimate' },
  { id: '3', type: 'command', text: 'Give your partner a slow, lingering kiss.', intensity: 'intimate' },
  { id: '4', type: 'dare', text: 'Caress your partner's hand or arm for 30 seconds.', intensity: 'intimate' },
  { id: '5', type: 'question', text: 'What part of your partner's body do you find most attractive?', intensity: 'intimate' },
  { id: '6', type: 'command', text: 'Gaze deeply into your partner's eyes for a full minute.', intensity: 'intimate' },
  { id: '7', type: 'dare', text: 'Slowly unbutton or untie a piece of your partner's clothing (don't remove it yet).', intensity: 'intimate' },
  { id: '8', type: 'question', text: 'What's a non-sexual touch that makes you feel loved?', intensity: 'intimate' },
  { id: '9', type: 'command', text: 'Give your partner a sensual back rub for two minutes.', intensity: 'intimate' },
  { id: '10', type: 'dare', text: 'Trace the outline of your partner's lips with your finger.', intensity: 'intimate' },

  // Passionate
  { id: '11', type: 'dare', text: 'Give your partner a passionate, open-mouthed kiss for at least 15 seconds.', intensity: 'passionate' },
  { id: '12', type: 'question', text: 'What's the most adventurous place you've fantasized about making love?', intensity: 'passionate' },
  { id: '13', type: 'command', text: 'Slowly undress your partner, maintaining eye contact.', intensity: 'passionate' },
  { id: '14', type: 'dare', text: 'Run your hands through your partner's hair and pull gently.', intensity: 'passionate' },
  { id: '15', type: 'question', text: 'What's a sound your partner makes that drives you wild?', intensity: 'passionate' },
  { id: '16', type: 'command', text: 'Kiss your partner's neck and jawline sensually.', intensity: 'passionate' },
  { id: '17', type: 'dare', text: 'Bite or nibble gently on your partner's earlobe.', intensity: 'passionate' },
  { id: '18', type: 'question', text: 'Describe a time your partner made you feel incredibly desired.', intensity: 'passionate' },
  { id: '19', type: 'command', text: 'Whisper a dirty secret or fantasy into your partner's ear.', intensity: 'passionate' },
  { id: '20', type: 'dare', text: 'Give your partner a lingering kiss, moving from their lips to their neck.', intensity: 'passionate' },

  // Ecstatic
  { id: '21', type: 'dare', text: 'Blindfold your partner and pleasure them for five minutes using only your hands and mouth.', intensity: 'ecstatic' },
  { id: '22', type: 'question', text: 'What's the naughtiest thing you've ever done or wanted to do?', intensity: 'ecstatic' },
  { id: '23', type: 'command', text: 'Initiate a position change that brings you closer to your partner.', intensity: 'ecstatic' },
  { id: '24', type: 'dare', text: 'Roleplay a fantasy scenario for the next 10 minutes.', intensity: 'ecstatic' },
  { id: '25', type: 'question', text: 'What's your ultimate sexual turn-on that you rarely get to experience?', intensity: 'ecstatic' },
  { id: '26', type: 'command', text: 'Explore your partner's most sensitive erogenous zones with your tongue.', intensity: 'ecstatic' },
  { id: '27', type: 'dare', text: 'Restrain your partner gently and tease them for three minutes.', intensity: 'ecstatic' },
  { id: '28', type: 'question', text: 'What's one boundary you're willing to push tonight?', intensity: 'ecstatic' },
  { id: '29', type: 'command', text: 'Bring your partner to the brink of climax using only your hands.', intensity: 'ecstatic' },
  { id: '30', type: 'dare', text: 'Tell your partner exactly what you want them to do to you right now, then guide their hand.', intensity: 'ecstatic' },
];

const App: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [intensityLevel, setIntensityLevel] = useState<'intimate' | 'passionate' | 'ecstatic'>('intimate');
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    // Shuffle cards at the start or when intensity changes
    const filteredCards = cards.filter(card => card.intensity === intensityLevel);
    setDeck(shuffleArray(filteredCards));
  }, [intensityLevel]);

  const shuffleArray = (array: Card[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return [...array]; // Return a new shuffled array
  };

  const startGame = () => {
    if (player1Name && player2Name) {
      setPlayers([
        { name: player1Name, score: 0 },
        { name: player2Name, score: 0 },
      ]);
      setGameStarted(true);
      drawCard();
    }
  };

  const drawCard = () => {
    if (deck.length > 0) {
      const card = deck.pop();
      if (card) {
        setCurrentCard(card);
      }
    } else {
      // Reshuffle if deck is empty
      const filteredCards = cards.filter(c => c.intensity === intensityLevel);
      setDeck(shuffleArray(filteredCards));
      const card = deck.pop(); // Draw again from the new deck
      if (card) {
        setCurrentCard(card);
      }
    }
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    drawCard();
  };

  const changeIntensity = (level: 'intimate' | 'passionate' | 'ecstatic') => {
    setIntensityLevel(level);
    setCurrentCard(null); // Clear current card when intensity changes
    // Deck will be re-shuffled by useEffect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-2xl w-full border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-red-400 mb-8 tracking-wide">Passion Pursuit</h1>

        {!gameStarted ? (
          <div className="space-y-6">
            <p className="text-center text-lg text-gray-300">Enter your names to begin your intimate journey.</p>
            <div>
              <label htmlFor="player1" className="block text-sm font-medium text-gray-300 mb-2">Player 1 Name</label>
              <input
                type="text"
                id="player1"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-red-500 focus:border-red-500 placeholder-gray-400"
                placeholder="e.g., Alex"
              />
            </div>
            <div>
              <label htmlFor="player2" className="block text-sm font-medium text-gray-300 mb-2">Player 2 Name</label>
              <input
                type="text"
                id="player2"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-red-500 focus:border-red-500 placeholder-gray-400"
                placeholder="e.g., Jamie"
              />
            </div>
            <button
              onClick={startGame}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-red-300 animate-pulse">
              {players[currentPlayerIndex].name}'s Turn
            </h2>

            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => changeIntensity('intimate')}
                className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                  intensityLevel === 'intimate' ? 'bg-red-700 text-white shadow-md' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                }`}
              >
                Intimate
              </button>
              <button
                onClick={() => changeIntensity('passionate')}
                className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                  intensityLevel === 'passionate' ? 'bg-red-700 text-white shadow-md' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                }`}
              >
                Passionate
              </button>
              <button
                onClick={() => changeIntensity('ecstatic')}
                className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                  intensityLevel === 'ecstatic' ? 'bg-red-700 text-white shadow-md' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                }`}
              >
                Ecstatic
              </button>
            </div>

            {currentCard && (
              <div className="bg-gray-900 border border-red-500 rounded-lg p-6 shadow-xl transform hover:scale-102 transition duration-300 ease-in-out">
                <p className="text-sm uppercase tracking-wider text-red-400 mb-2">{currentCard.type}</p>
                <p className="text-3xl font-semibold text-white leading-relaxed">{currentCard.text}</p>
                <p className="text-xs mt-4 text-gray-400">Intensity: <span className="capitalize text-red-300">{currentCard.intensity}</span></p>
              </div>
            )}

            <button
              onClick={nextTurn}
              className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Next Turn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
