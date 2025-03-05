import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calculator, FlaskRound as Flask, BookOpen, Globe, Trophy, Star } from 'lucide-react';

const subjectData = {
  math: {
    title: 'Mathematics',
    icon: Calculator,
    color: 'bg-blue-500',
    games: [
      {
        id: 'math-puzzle',
        name: 'Number Ninja',
        description: 'Solve math puzzles with increasing difficulty',
        difficulty: 'Beginner',
      },
      {
        id: 'fraction-master',
        name: 'Fraction Master',
        description: 'Master fractions through fun challenges',
        difficulty: 'Intermediate',
      },
      {
        id: 'geometry-quest',
        name: 'Geometry Quest',
        description: 'Explore shapes and spatial reasoning',
        difficulty: 'Advanced',
      },
    ],
  },
  science: {
    title: 'Science',
    icon: Flask,
    color: 'bg-green-500',
    games: [
      {
        id: 'lab-explorer',
        name: 'Lab Explorer',
        description: 'Conduct virtual experiments',
        difficulty: 'Beginner',
      },
      {
        id: 'ecosystem-adventure',
        name: 'Ecosystem Adventure',
        description: 'Learn about different ecosystems',
        difficulty: 'Intermediate',
      },
      {
        id: 'space-journey',
        name: 'Space Journey',
        description: 'Explore the solar system',
        difficulty: 'Advanced',
      },
    ],
  },
  english: {
    title: 'English',
    icon: BookOpen,
    color: 'bg-purple-500',
    games: [
      {
        id: 'word-match',
        name: 'Word Match',
        description: 'Match words with their definitions',
        difficulty: 'Beginner',
      },
      {
        id: 'grammar-hero',
        name: 'Grammar Hero',
        description: 'Master grammar rules',
        difficulty: 'Intermediate',
      },
      {
        id: 'story-creator',
        name: 'Story Creator',
        description: 'Create your own stories',
        difficulty: 'Advanced',
      },
    ],
  },
  'social-studies': {
    title: 'Social Studies',
    icon: Globe,
    color: 'bg-orange-500',
    games: [
      {
        id: 'history-quest',
        name: 'History Quest',
        description: 'Journey through historical events',
        difficulty: 'Beginner',
      },
      {
        id: 'geography-explorer',
        name: 'Geography Explorer',
        description: 'Explore countries and cultures',
        difficulty: 'Intermediate',
      },
      {
        id: 'civics-challenge',
        name: 'Civics Challenge',
        description: 'Learn about government and citizenship',
        difficulty: 'Advanced',
      },
    ],
  },
};

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: keyof typeof subjectData }>();
  const data = subject ? subjectData[subject] : null;

  if (!data) {
    return <div>Subject not found</div>;
  }

  const Icon = data.icon;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-xl ${data.color} text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
      </div>

      <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
        <div className="flex-none bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-sm border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-600" size={20} />
            <span className="text-sm font-medium text-yellow-900">Level 5</span>
          </div>
        </div>
        <div className="flex-none bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm border border-blue-200">
          <div className="flex items-center space-x-2">
            <Star className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-blue-900">250 Points</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {data.games.map((game) => (
          <Link
            key={game.id}
            to={`/game/${subject}/${game.id}`}
            className="block bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
                <p className="text-gray-600 mt-1">{game.description}</p>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                game.difficulty === 'Beginner' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 border border-emerald-200' 
                  : game.difficulty === 'Intermediate'
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-gradient-to-r from-red-50 to-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {game.difficulty}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;