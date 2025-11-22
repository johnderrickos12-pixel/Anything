import React from 'react';
import { CardContent } from '../types';

interface CardProps {
  content: CardContent;
  onCardAction?: (action: string) => void;
  intensityLevel?: 'intimate' | 'passionate' | 'ecstatic';
}

const Card: React.FC<CardProps> = ({ content, intensityLevel = 'intimate' }) => {
  const intensityColors = {
    intimate: 'bg-gradient-to-br from-purple-700 to-indigo-700',
    passionate: 'bg-gradient-to-br from-pink-700 to-red-700',
    ecstatic: 'bg-gradient-to-br from-red-800 to-yellow-600',
  };

  const borderColors = {
    intimate: 'border-purple-500',
    passionate: 'border-pink-500',
    ecstatic: 'border-yellow-400',
  };

  return (
    <div
      className={`relative w-80 h-96 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300
                  ${intensityColors[intensityLevel]} ${borderColors[intensityLevel]} border-4
                  flex flex-col items-center justify-center p-6 text-white text-center font-serif cursor-pointer`}
    >
      <div className="absolute top-4 left-4 text-sm uppercase opacity-70">
        {content.type}
      </div>
      <h3 className="text-3xl font-bold mb-4">{content.title}</h3>
      <p className="text-xl leading-relaxed italic">{content.description}</p>
      {content.options && content.options.length > 0 && (
        <div className="mt-6">
          {content.options.map((option, index) => (
            <button
              key={index}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 px-4 rounded-full mt-2 mx-1 text-lg transition-colors duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div className="absolute bottom-4 right-4 text-sm uppercase opacity-70">
        Level: {intensityLevel}
      </div>
    </div>
  );
};

export default Card;
