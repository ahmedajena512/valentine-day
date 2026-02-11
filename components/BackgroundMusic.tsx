import React, { useEffect, useRef, useState } from 'react';

interface BackgroundMusicProps {
  shouldPlay: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ shouldPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // 🎵 I've added a beautiful romantic piano track as a placeholder!
  // To use "Make You Mine" as requested, please upload your mp3 file 
  // and replace the URL below (e.g., "/music/make-you-mine.mp3").
  const MUSIC_SRC = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; 

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      // Set a gentle volume so it doesn't overpower the sound effects
      audioRef.current.volume = 0.3; 
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio autoplay was prevented:", error);
          // Browsers might block autoplay until user interaction. 
          // Since this triggers after the "Start" click, it should work!
        });
      }
    }
  }, [shouldPlay]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !audioRef.current.muted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-opacity duration-500 ${shouldPlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <audio 
        ref={audioRef} 
        src={MUSIC_SRC} 
        loop 
        preload="auto" 
      />
      <button 
        onClick={toggleMute}
        className="bg-white/60 hover:bg-white/90 backdrop-blur-md text-pink-600 p-3 rounded-full shadow-lg border border-pink-200 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        <span className="text-xl">{isMuted ? '🔇' : '🎵'}</span>
      </button>
    </div>
  );
};

export default BackgroundMusic;