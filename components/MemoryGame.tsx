import React, { useState, useEffect } from 'react';
import { EMOJIS } from '../constants';
import { MemoryCard } from '../types';
import { soundService } from '../services/sound';

interface MemoryGameProps {
  onComplete: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Duplicate emojis to create pairs and shuffle
    const gameEmojis = [...EMOJIS, ...EMOJIS];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (id: number) => {
    if (isProcessing) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isMatched || clickedCard.isFlipped) return;

    soundService.playFlip();

    // Flip the card
    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          soundService.playMatch();
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setIsProcessing(false);
          
          // Check win condition
          if (newCards.filter(c => !c.isMatched && c.id !== firstId && c.id !== secondId).length === 0) {
            setTimeout(() => {
                soundService.playFanfare();
                onComplete();
            }, 1000);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 z-10 relative">
      <h2 className="text-3xl font-handwriting text-red-500 mb-6 animate-bounce">Match the Love Symbols!</h2>
      <div className="grid grid-cols-3 gap-3 w-full">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 transform ${
              card.isMatched 
                ? 'bg-white shadow-lg rotate-y-180 scale-100 animate-pop border-2 border-green-400'
                : card.isFlipped 
                    ? 'bg-white shadow-lg rotate-y-180 scale-100'
                    : 'bg-red-300 hover:bg-red-400 scale-95 hover:scale-100'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;