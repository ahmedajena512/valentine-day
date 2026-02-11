import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import MemoryGame from './components/MemoryGame';
import Quiz from './components/Quiz';
import Proposal from './components/Proposal';
import Success from './components/Success';
import BackgroundMusic from './components/BackgroundMusic';
import { GameState } from './types';
import { soundService } from './services/sound';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);

  const startJourney = async () => {
    await soundService.init(); // Unlock AudioContext on user interaction
    soundService.playCorrect(); // Small feedback sound
    setGameState(GameState.MEMORY_GAME);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.INTRO:
        return (
          <div key="intro" className="text-center z-10 p-8 bg-white/30 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 max-w-lg mx-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-handwriting text-red-600 mb-4 drop-shadow-md">
              Hey Kulthom...
            </h1>
            <p className="text-gray-700 text-lg mb-8 font-light">
              I made something special just for you. Are you ready?
            </p>
            <button
              onClick={startJourney}
              className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 animate-pulse"
            >
              Start My Surprise ❤️
            </button>
          </div>
        );
      
      case GameState.MEMORY_GAME:
        return (
          <div key="memory" className="flex flex-col items-center animate-fade-in-up">
             <div className="mb-4 bg-white/80 px-4 py-2 rounded-full text-pink-600 text-sm font-semibold shadow-sm">
               Level 1: Unlock My Heart
             </div>
            <MemoryGame onComplete={() => setGameState(GameState.QUIZ)} />
          </div>
        );

      case GameState.QUIZ:
        return (
           <div key="quiz" className="flex flex-col items-center animate-fade-in-up w-full">
            <div className="mb-4 bg-white/80 px-4 py-2 rounded-full text-pink-600 text-sm font-semibold shadow-sm">
               Level 2: How well do you know us?
             </div>
            <Quiz onComplete={() => setGameState(GameState.PROPOSAL)} />
          </div>
        );

      case GameState.PROPOSAL:
        return (
          <div key="proposal" className="w-full flex justify-center">
             {/* Proposal has its own internal animate-fade-in-up, but the key ensures remounting */}
             <Proposal onAccept={() => setGameState(GameState.SUCCESS)} />
          </div>
        );

      case GameState.SUCCESS:
        return (
          <div key="success" className="w-full animate-fade-in-up">
            <Success />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 overflow-hidden relative">
      <HeartBackground />
      <BackgroundMusic shouldPlay={gameState !== GameState.INTRO} />
      {renderContent()}
      
      {/* Footer / Credits */}
      <div className="absolute bottom-2 text-center w-full text-pink-300 text-xs opacity-50 pointer-events-none">
        Made with ❤️ for Valentine's Day
      </div>
    </div>
  );
};

export default App;