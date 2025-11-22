import React, { useState } from 'react';
import './index.css';

type Player = {
  name: string;
  score: number;
};

type Card = {
  id: number;
text: string;
  type: 'dare' | 'question' | 'command';
  intensity: 'intimate' | 'passionate' | 'ecstatic';
};

const cards: Card[] = [
  // Intimate Dares
  { id: 1, text: "Give your partner a slow, sensual massage for one minute.", type: "dare", intensity: "intimate" },
  { id: 2, text: "Whisper something you find attractive about your partner in their ear.", type: "dare", intensity: "intimate" },
  { id: 3, text: "Caress your partner's hand, looking into their eyes.", type: "dare", intensity: "intimate" },
  { id: 4, text: "Share your favorite memory of intimacy with your partner.", type: "dare", intensity: "intimate" },
  { id: 5, text: "Kiss your partner on the neck for 10 seconds.", type: "dare", intensity: "intimate" },
  { id: 6, text: "Describe your partner using three words that excite you.", type: "dare", intensity: "intimate" },
  { id: 7, text: "Hold your partner close and sway to an imaginary song.", type: "dare", intensity: "intimate" },
  { id: 8, text: "Trace a finger along your partner's arm, making eye contact.", type: "dare", intensity: "intimate" },
  { id: 9, text: "Tell your partner one thing you'd like to try with them tonight.", type: "dare", intensity: "intimate" },
  { id: 10, text: "Place your hand on your partner's thigh and gently squeeze.", type: "dare", intensity: "intimate" },

  // Passionate Dares
  { id: 11, text: "Give your partner a passionate kiss that lasts for at least 15 seconds.", type: "dare", intensity: "passionate" },
  { id: 12, text: "Remove one item of your partner's clothing with your teeth or mouth.", type: "dare", intensity: "passionate" },
  { id: 13, text: "Blindfold your partner and give them three sensual touches, making them guess where.", type: "dare", intensity: "passionate" },
  { id: 14, text: "Whisper a fantasy you have about your partner.", type: "dare", intensity: "passionate" },
  { id: 15, text: "Kiss your partner's body wherever you desire for 30 seconds.", type: "dare", intensity: "passionate" },
  { id: 16, text: "Perform a seductive dance for your partner, lasting at least 20 seconds.", type: "dare", intensity: "passionate" },
  { id: 17, text: "Share the wildest place you've ever imagined being intimate with your partner.", type: "dare", intensity: "passionate" },
  { id: 18, text: "Use an ice cube or warm liquid to tease your partner's skin.", type: "dare", intensity: "passionate" },
  { id: 19, text: "Caress your partner's inner thigh for 20 seconds, maintaining eye contact.", type: "dare", intensity: "passionate" },
  { id: 20, text: "Suggest a position you'd like to try tonight and describe why.", type: "dare", intensity: "passionate" },

  // Ecstatic Dares
  { id: 21, text: "Engage in a full minute of uninterrupted, deep French kissing.", type: "dare", intensity: "ecstatic" },
  { id: 22, text: "Remove one article of your own clothing in a seductive manner, then do the same for your partner.", type: "dare", intensity: "ecstatic" },
  { id: 23, text: "Give your partner a minute-long oral pleasure using only your mouth, without hands.", type: "dare", intensity: "ecstatic" },
  { id: 24, text: "Describe in vivid detail your most intense sexual fantasy involving your partner.", type: "dare", intensity: "ecstatic" },
  { id: 25, text: "Experiment with a new form of touch, like light biting or gentle spanking, for 30 seconds.", type: "dare", intensity: "ecstatic" },
  { id: 26, text: "Lead your partner to the bedroom (or another private spot) and initiate a new activity.", type: "dare", intensity: "ecstatic" },
  { id: 27, text: "Perform a body shot off your partner's neck or chest.", type: "dare", intensity: "ecstatic" },
  { id: 28, text: "Role-play a scenario your partner suggests for five minutes.", type: "dare", intensity: "ecstatic" },
  { id: 29, text: "Spend two minutes exclusively focused on pleasuring your partner's erogenous zones.", type: "dare", intensity: "ecstatic" },
  { id: 30, text: "Take charge and dictate the next 5 minutes of intimacy with your partner.", type: "dare", intensity: "ecstatic" },

  // Intimate Questions
  { id: 31, text: "What's one small gesture that makes you feel deeply loved?", type: "question", intensity: "intimate" },
  { id: 32, text: "What is your favorite non-sexual way to receive affection?", type: "question", intensity: "intimate" },
  { id: 33, text: "What's a romantic memory you cherish involving us?", type: "question", intensity: "intimate" },
  { id: 34, text: "What quality do you find most comforting in a partner?", type: "question", intensity: "intimate" },
  { id: 35, text: "If you could only use one word to describe our connection, what would it be?", type: "question", intensity: "intimate" },
  { id: 36, text: "What's a simple act of kindness from your partner that means a lot to you?", type: "question", intensity: "intimate" },
  { id: 37, text: "What's one thing you appreciate about our shared quiet moments?", type: "question", intensity: "intimate" },
  { id: 38, text: "What's a scent or sound that makes you feel nostalgic for our early days?", type: "question", intensity: "intimate" },
  { id: 39, text: "What's one dream you have for us as a couple?", type: "question", intensity: "intimate" },
  { id: 40, text: "What's a secret desire you have that you haven't shared yet?", type: "question", intensity: "intimate" },

  // Passionate Questions
  { id: 41, text: "What's something you've always wanted to try in bed?", type: "question", intensity: "passionate" },
  { id: 42, text: "What's a fantasy you've had about us that you've never mentioned?", type: "question", intensity: "passionate" },
  { id: 43, text: "What part of my body do you find most alluring?", type: "question", intensity: "passionate" },
  { id: 44, text: "What's the most adventurous place you've imagined being intimate?", type: "question", intensity: "passionate" },
  { id: 45, text: "What's a turn-on that might surprise me?", type: "question", intensity: "passionate" },
  { id: 46, text: "What kind of touch makes your skin tingle the most?", type: "question", intensity: "passionate" },
  { id: 47, text: "What's a dominant or submissive role you'd be curious to explore?", type: "question", intensity: "passionate" },
  { id: 48, text: "What's one boundary you'd be willing to push with me?", type: "question", intensity: "passionate" },
  { id: 49, text: "What's a specific fantasy you've had that you'd like to share details about?", type: "question", intensity: "passionate" },
  { id: 50, text: "What is your biggest turn-on that isn't physical?", type: "question", intensity: "passionate" },

  // Ecstatic Questions
  { id: 51, text: "Describe your ultimate, no-holds-barred sexual fantasy with me.", type: "question", intensity: "ecstatic" },
  { id: 52, text: "What's the most taboo sexual act you'd be willing to explore with me?", type: "question", intensity: "ecstatic" },
  { id: 53, text: "What's a specific scenario or role-play you're dying to try tonight?", type: "question", intensity: "ecstatic" },
  { id: 54, text: "What's a secret desire that you've only imagined, but never dared to speak?", type: "question", intensity: "ecstatic" },
  { id: 55, text: "What's one thing I could do right now to drive you absolutely wild?", type: "question", intensity: "ecstatic" },
  { id: 56, text: "What are your deepest, darkest sexual cravings?", type: "question", intensity: "ecstatic" },
  { id: 57, text: "If you had a magic wand and could fulfill any sexual desire tonight, what would it be?", type: "question", intensity: "ecstatic" },
  { id: 58, text: "What's one sexual boundary you've always had that you'd consider breaking with me?", type: "question", intensity: "ecstatic" },
  { id: 59, text: "Describe a moment of intense pleasure you've experienced with me that you often revisit in your mind.", type: "question", intensity: "ecstatic" },
  { id: 60, text: "What's the most extreme thing you've ever wanted to do during sex?", type: "question", intensity: "ecstatic" },

  // Intimate Commands
  { id: 61, text: "Hold my hand and tell me three things you love about me.", type: "command", intensity: "intimate" },
  { id: 62, text: "Give me a long, lingering hug.", type: "command", intensity: "intimate" },
  { id: 63, text: "Whisper a compliment into my ear.", type: "command", intensity: "intimate" },
  { id: 64, text: "Look into my eyes for 30 seconds without speaking.", type: "command", intensity: "intimate" },
  { id: 65, text: "Gently caress my cheek and tell me what you're thinking.", type: "command", intensity: "intimate" },
  { id: 66, text: "Share a tender touch on my arm or leg for one minute.", type: "command", intensity: "intimate" },
  { id: 67, text: "Give me a soft kiss on the forehead.", type: "command", intensity: "intimate" },
  { id: 68, text: "Rest your head on my shoulder for a moment of quiet closeness.", type: "command", intensity: "intimate" },
  { id: 69, text: "Write down one reason why you're grateful for me.", type: "command", intensity: "intimate" },
  { id: 70, text: "Give me a comforting embrace.", type: "command", intensity: "intimate" },

  // Passionate Commands
  { id: 71, text: "Give me a passionate kiss on the lips for at least 20 seconds.", type: "command", intensity: "passionate" },
  { id: 72, text: "Gently bite my earlobe and whisper something naughty.", type: "command", intensity: "passionate" },
  { id: 73, text: "Run your hands through my hair and pull me closer for a deep kiss.", type: "command", intensity: "passionate" },
  { id: 74, text: "Kiss my neck and jawline for one minute, making me shiver.", type: "command", intensity: "passionate" },
  { id: 75, text: "Caress my inner thigh for 30 seconds, maintaining eye contact.", type: "command", intensity: "passionate" },
  { id: 76, text: "Unbutton my shirt slowly, teasingly.", type: "command", intensity: "passionate" },
  { id: 77, text: "Give me a lingering kiss that travels from my lips down to my chest.", type: "command", intensity: "passionate" },
  { id: 78, text: "Lie on top of me and grind your hips gently against mine for 30 seconds.", type: "command", intensity: "passionate" },
  { id: 79, text: "Remove one piece of my clothing without using your hands.", type: "command", intensity: "passionate" },
  { id: 80, text: "Tell me what you want to do to me tonight, in detail.", type: "command", intensity: "passionate" },

  // Ecstatic Commands
  { id: 81, text: "Give me oral pleasure for a full minute, focusing on my most sensitive spots.", type: "command", intensity: "ecstatic" },
  { id: 82, text: "Strip completely naked in front of me, slowly and suggestively.", type: "command", intensity: "ecstatic" },
  { id: 83, text: "Blindfold me and tease my body with your hands and mouth for two minutes.", type: "command", intensity: "ecstatic" },
  { id: 84, text: "Take me to the bedroom and initiate sex exactly how you desire.", type: "command", intensity: "ecstatic" },
  { id: 85, text: "Use your tongue to trace a path from my neck down to my groin, without touching anywhere else.", type: "command", intensity: "ecstatic" },
  { id: 86, text: "Tie my wrists gently with a silk scarf and tell me what you're going to do to me.", type: "command", intensity: "ecstatic" },
  { id: 87, text: "Ride me for two minutes, looking into my eyes the entire time.", type: "command", intensity: "ecstatic" },
  { id: 88, text: "Pin me against a wall and kiss me with intense passion, exploring my mouth deeply.", type: "command", intensity: "ecstatic" },
  { id: 89, text: "Tell me your dirtiest fantasy and then act it out with me for the next five minutes.", type: "command", intensity: "ecstatic" },
  { id: 90, text: "Command me to do something purely for your pleasure.", type: "command", intensity: "ecstatic" },
];

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [currentIntensity, setCurrentIntensity] = useState<'intimate' | 'passionate' | 'ecstatic'>('intimate');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const startGame = () => {
    if (player1Name && player2Name) {
      setPlayers([
        { name: player1Name, score: 0 },
        { name: player2Name, score: 0 },
      ]);
      setGameStarted(true);
      drawCard();
    } else {
      alert('Please enter names for both players.');
    }
  };

  const getFilteredCards = () => {
    return cards.filter(card => card.intensity === currentIntensity);
  };

  const drawCard = () => {
    const filteredCards = getFilteredCards();
    if (filteredCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      setCurrentCard(filteredCards[randomIndex]);
    } else {
      setCurrentCard(null); // No cards for this intensity
    }
  };

  const completeCard = () => {
    // For simplicity, we just move to the next player and draw a new card
    // In a more complex game, we might add scoring or player choice
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    drawCard();
  };

  const increaseIntensity = () => {
    if (currentIntensity === 'intimate') {
      setCurrentIntensity('passionate');
    } else if (currentIntensity === 'passionate') {
      setCurrentIntensity('ecstatic');
    }
    // If ecstatic, it stays ecstatic
    drawCard();
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-8 font-serif">Passion Pursuit</h1>

        {!gameStarted ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Enter Player Names</h2>
            <div>
              <input
                type="text"
                placeholder="Player 1 Name"
                className="w-full p-3 mb-4 bg-gray-700 border border-red-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
              <input
                type="text"
                placeholder="Player 2 Name"
                className="w-full p-3 bg-gray-700 border border-red-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </div>
            <button
              onClick={startGame}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-400">Current Player: {currentPlayer?.name}</h2>
            <p className="text-lg text-gray-300">Intensity: <span className={`font-semibold ${currentIntensity === 'intimate' ? 'text-blue-300' : currentIntensity === 'passionate' ? 'text-purple-400' : 'text-red-500'}`}>{currentIntensity.toUpperCase()}</span></p>

            {currentCard ? (
              <div className="bg-gray-700 p-6 rounded-lg shadow-inner border border-red-700">
                <p className="text-xl italic mb-4 text-gray-200">"{currentCard.text}"</p>
                <p className="text-md text-gray-400">Type: {currentCard.type.charAt(0).toUpperCase() + currentCard.type.slice(1)}</p>
              </div>
            ) : (
              <p className="text-xl text-gray-300">No cards left for this intensity!</p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={completeCard}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Complete & Next
              </button>
              {currentIntensity !== 'ecstatic' && (
                <button
                  onClick={increaseIntensity}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Increase Intensity
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
