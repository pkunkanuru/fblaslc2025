import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Game components
import MathGame from './math/MathGame';
import ScienceGame from './science/ScienceGame';
import EnglishGame from './english/EnglishGame';
import SocialStudiesGame from './social/SocialStudiesGame';

const GamePage: React.FC = () => {
  const { subject, gameId } = useParams();
  const navigate = useNavigate();
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const renderGame = () => {
    switch (subject) {
      case 'math':
        return <MathGame gameId={gameId} onScoreChange={setScore} onLifeLost={() => setLives(l => Math.max(0, l - 1))} />;
      case 'science':
        return <ScienceGame gameId={gameId} onScoreChange={setScore} onLifeLost={() => setLives(l => Math.max(0, l - 1))} />;
      case 'english':
        return <EnglishGame gameId={gameId} onScoreChange={setScore} onLifeLost={() => setLives(l => Math.max(0, l - 1))} />;
      case 'social-studies':
        return <SocialStudiesGame gameId={gameId} onScoreChange={setScore} onLifeLost={() => setLives(l => Math.max(0, l - 1))} />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  size={20}
                  className={i < lives ? 'text-red-500' : 'text-gray-300'}
                  fill={i < lives ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">{score}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderGame()}
      </div>
    </div>
  );
};

export default GamePage;