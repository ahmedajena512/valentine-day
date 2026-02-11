import React, { useState, useRef } from 'react';
import { soundService } from '../services/sound';

interface ProposalProps {
  onAccept: () => void;
}

const Proposal: React.FC<ProposalProps> = ({ onAccept }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const moveButton = () => {
    soundService.playSwoosh();
    
    if (!hasMoved) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }

    setHasMoved(true);
    
    // Let's use relative translation to avoid complex absolute math issues on different screens
    setNoBtnPosition({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 });
  };

  const handleNoHover = (e: React.MouseEvent) => {
    soundService.playSwoosh();
    
    if (!hasMoved) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }

    // Calculate new position away from cursor
    const newX = (Math.random() - 0.5) * 400;
    const newY = (Math.random() - 0.5) * 400;
    
    setNoBtnPosition({ x: newX, y: newY });
    setHasMoved(true);
  };

  const handleYes = () => {
    soundService.playFanfare();
    onAccept();
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 z-20 relative animate-fade-in-up">
      <div className="text-6xl mb-6 animate-pulse">💝</div>
      <h1 className="text-4xl md:text-6xl font-handwriting text-red-600 mb-8 drop-shadow-sm">
        Will you be my Valentine?
      </h1>
      
      <div className="flex gap-8 items-center justify-center h-32 relative w-full max-w-lg">
        <button
          onClick={handleYes}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full shadow-lg text-xl z-20 animate-gentle-pulse hover:animate-none transform hover:scale-110 transition-all duration-300"
        >
          YES! 😍
        </button>

        <button
          onMouseEnter={handleNoHover}
          onClick={moveButton} // Fallback for mobile tap
          style={{
            transform: hasMoved ? `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)` : 'none',
            transition: 'transform 0.2s ease-out',
            position: hasMoved ? 'absolute' : 'relative',
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-12 rounded-full shadow-lg text-xl z-10 transition-colors relative"
        >
          No 😢
          
          {/* Tooltip Popup */}
          <div 
            className={`absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-xl pointer-events-none transition-all duration-300 min-w-[120px] z-30 ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            Too slow! 😜
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-gray-800"></div>
          </div>
        </button>
      </div>
      
      {hasMoved && (
        <p className="mt-12 text-pink-400 text-sm animate-bounce">
          (You can't catch the "No" button! 😉)
        </p>
      )}
    </div>
  );
};

export default Proposal;