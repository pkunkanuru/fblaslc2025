import React, { useState } from 'react';

interface SocialStudiesGameProps {
  gameId?: string;
  onScoreChange: (score: number) => void;
  onLifeLost: () => void;
}

const games = {
  'history-quest': {
    questions: [
      {
        question: 'Who was the first President of the United States?',
        options: ['John Adams', 'Thomas Jefferson', 'George Washington', 'Benjamin Franklin'],
        answer: 'George Washington'
      },
      {
        question: 'In which year did the United States declare independence?',
        options: ['1776', '1783', '1789', '1492'],
        answer: '1776'
      }
    ]
  },
  'geography-explorer': {
    questions: [
      {
        question: 'Which continent is the largest by land area?',
        options: ['North America', 'Africa', 'Asia', 'Europe'],
        answer: 'Asia'
      },
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Madrid', 'Paris'],
        answer: 'Paris'
      }
    ]
  },
  'civics-challenge': {
    questions: [
      {
        question: 'How many branches of government are there in the United States?',
        options: ['Two', 'Three', 'Four', 'Five'],
        answer: 'Three'
      },
      {
        question: 'What is the highest court in the United States?',
        options: ['District Court', 'Circuit Court', 'Supreme Court', 'State Court'],
        answer: 'Supreme Court'
      }
    ]
  }
};

const SocialStudiesGame: React.FC<SocialStudiesGameProps> = ({ gameId, onScoreChange, onLifeLost }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!gameId || !games[gameId as keyof typeof games]) {
    return <div>Game not found</div>;
  }

  const currentGame = games[gameId as keyof typeof games];
  const question = currentGame.questions[currentQuestion];

  const handleAnswer = (selectedAnswer: string) => {
    const correct = selectedAnswer === question.answer;
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
      setCurrentQuestion((prev) => 
        prev < currentGame.questions.length - 1 ? prev + 1 : 0
      );
    }, 1500);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
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

export default SocialStudiesGame;