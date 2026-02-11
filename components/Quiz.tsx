import React, { useState } from 'react';
import { soundService } from '../services/sound';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    {
      text: "Who loves you the most in the whole wide world?",
      options: ["Me (Your BF)", "The Dog", "Pizza"],
      correct: 0, 
      cuteMessage: "Correct! Nobody loves you like I do! ❤️"
    },
    {
      text: "What is your best quality?",
      options: ["Everything", "Your Smile", "Your Kindness"],
      correct: 0, // All correct effectively
      cuteMessage: "Trick question! It's EVERYTHING about you! ✨"
    },
    {
      text: "Where do I want to be right now?",
      options: ["Work", "With You", "Gym"],
      correct: 1,
      cuteMessage: "Always with you. Forever. 💑"
    },
    {
      text: "Who do you love more? 😿",
      options: ["Ahmed", "Mohamed", "Malek"],
      correct: 0,
      cuteMessage: "Yay! I knew you loved me most! 🥰"
    }
  ];

  const handleAnswer = (index: number) => {
    const q = questions[currentQuestion];
    
    // Enforce correct answer for strict questions (Strict for everything except the "Best Quality" question)
    const isStrict = currentQuestion !== 1;

    if (isStrict && index !== q.correct) {
        soundService.playSwoosh(); // Reuse swoosh for "wrong"
        alert("Try again! 😢");
        return;
    }

    soundService.playCorrect();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const q = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl z-10 relative border-2 border-pink-100">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-red-400 transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center animate-fade-in">{q.text}</h2>
      
      <div className="flex flex-col gap-4 w-full">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full py-4 px-6 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl font-semibold transition-all duration-200 border border-pink-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 text-lg"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;