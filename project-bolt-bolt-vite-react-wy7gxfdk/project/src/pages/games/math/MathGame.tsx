import React, { useState, useEffect } from 'react';

interface MathGameProps {
  gameId?: string;
  onScoreChange: (score: number) => void;
  onLifeLost: () => void;
}

const MathGame: React.FC<MathGameProps> = ({ gameId, onScoreChange, onLifeLost }) => {
  const [problem, setProblem] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    let question = '';
    let answer = 0;

    switch (gameId) {
      case 'math-puzzle':
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        question = `What is ${num1} + ${num2}?`;
        answer = num1 + num2;
        break;
      case 'fraction-master':
        const denom = Math.floor(Math.random() * 5) + 2;
        const numer = Math.floor(Math.random() * denom) + 1;
        question = `What is ${numer}/${denom} as a decimal? (Round to 2 decimal places)`;
        answer = Math.round((numer / denom) * 100) / 100;
        break;
      case 'geometry-quest':
        const side = Math.floor(Math.random() * 10) + 1;
        question = `What is the area of a square with side length ${side}?`;
        answer = side * side;
        break;
      default:
        question = 'Game not found';
        answer = 0;
    }

    setProblem({ question, answer });
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateProblem();
  }, [gameId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseFloat(userAnswer);
    
    if (numAnswer === problem.answer) {
      setFeedback('Correct! 🎉');
      setScore(s => s + 10);
      onScoreChange(score + 10);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('Try again! 😢');
      onLifeLost();
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-4">{problem.question}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              step="0.01"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your answer"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Submit Answer
            </button>
          </form>

          {feedback && (
            <div className={`mt-4 text-center font-medium ${
              feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathGame;