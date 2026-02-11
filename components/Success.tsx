import React, { useEffect, useState } from 'react';
import { generateLoveNote, generateValentineImage } from '../services/gemini';
import confetti from 'canvas-confetti';

const Success: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire confetti!
    const duration = 1000; // Stop after 1 second
    const animationEnd = Date.now() + duration;
    
    // Initial blast
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF0000'],
      shapes: ['circle']
    });

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Side cannons
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FF0000'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FF0000'],
      });
    }, 150);

    // Fetch AI Note and Image
    const loadContent = async () => {
      try {
        const [text, image] = await Promise.all([
          generateLoveNote(),
          generateValentineImage()
        ]);
        setNote(text);
        setBgImage(image);
      } catch (e) {
        console.error("Error loading content", e);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto z-20 relative min-h-[60vh]">
      <div className="text-8xl mb-4 animate-bounce">💖</div>
      <h1 className="text-4xl md:text-5xl font-handwriting text-red-600 mb-6 drop-shadow-sm">
        Yay! I love you, Kulthom!
      </h1>
      
      <div className={`relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl shadow-xl transform rotate-1 border border-pink-200 max-w-lg w-full transition-transform hover:rotate-0 hover:scale-105 duration-500 min-h-[300px] flex flex-col items-center justify-center`}>
        
        {/* Background Image Layer */}
        {bgImage && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 animate-fade-in"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-10 p-8 w-full">
          <h3 className="text-pink-600 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-sm">A Special Note For You</h3>
          {loading ? (
            <div className="flex justify-center space-x-2 animate-pulse py-4">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
          ) : (
            <p className="text-2xl text-gray-800 font-handwriting leading-relaxed animate-fade-in drop-shadow-sm">
              "{note}"
            </p>
          )}
        </div>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="mt-12 text-pink-600 underline opacity-60 hover:opacity-100 transition-opacity text-sm font-medium"
      >
        Replay our Love Story
      </button>
    </div>
  );
};

export default Success;