import React, { useState, useEffect } from 'react';

interface ScienceGameProps {
  gameId?: string;
  onScoreChange: (score: number) => void;
  onLifeLost: () => void;
}

const questions = {
  'lab-explorer': [
    {
      question: 'What state of matter takes the shape of its container and has a definite volume?',
      options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
      answer: 'Liquid'
    },
    {
      question: 'Which force pulls objects toward the center of the Earth?',
      options: ['Magnetism', 'Friction', 'Gravity', 'Electricity'],
      answer: 'Gravity'
    }
  ],
  'ecosystem-adventure': [
    {
      question: 'What do plants need to perform photosynthesis?',
      options: ['Sunlight and water', 'Darkness and soil', 'Wind and rain', 'Heat and sound'],
      answer: 'Sunlight and water'
    },
    {
      question: 'Which animal is a producer in a food chain?',
      options: ['Lion', 'Grass', 'Rabbit', 'Snake'],
      answer: 'Grass'
    }
  ],
  'space-journey': [
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars'
    },
    {
      question: 'What is the closest star to Earth?',
      options: ['Proxima Centauri', 'The Sun', 'Sirius', 'Alpha Centauri'],
      answer: 'The Sun'
    }
  ]
};

const ScienceGame: React.FC<ScienceGameProps> = ({ gameId, onScoreChange, onLifeLost }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const gameQuestions = gameId ? questions[gameId as keyof typeof questions] : [];

  const handleAnswer = (selectedAnswer: string) => {
    const correct = selectedAnswer === gameQuestions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(s => s + 10);
      onScoreChange(score + 10);
    } else {
      onLifeLost();
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < gameQuestions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setCurrentQuestion(0);
      }
    }, 1500);
  };

  if (!gameId || !gameQuestions.length) {
    return <div>Game not found</div>;
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-6">
            {gameQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {gameQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-4 text-center font-medium ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? 'Correct! 🎉' : 'Try again! 😢'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScienceGame;