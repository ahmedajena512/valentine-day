import React, { useEffect, useState } from 'react';

// Sub-component for individual heart behavior
const InteractiveHeart: React.FC<{
  left: number;
  size: number;
  delay: number;
  duration: number;
}> = ({ left, size, delay, duration }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.5); // Start with default opacity-50 equivalent
  const [scale, setScale] = useState(1);

  const interact = () => {
    // Random direction drift
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 50;
    setOffset({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
    setOpacity(0); // Fade out
    setScale(0.5); // Shrink
  };

  return (
    <div
      className="floating-heart absolute text-pink-300"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        pointerEvents: 'auto', // Override CSS pointer-events: none
        zIndex: 0,
      }}
    >
      <div
        onMouseEnter={interact}
        onClick={interact}
        onTouchStart={interact}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          opacity: opacity,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        ❤️
      </div>
    </div>
  );
};

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 15,
      delay: Math.random() * 15, // Stagger start times more
      duration: 15 + Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <InteractiveHeart 
          key={heart.id} 
          left={heart.left} 
          size={heart.size} 
          delay={heart.delay}
          duration={heart.duration}
        />
      ))}
    </>
  );
};

export default HeartBackground;