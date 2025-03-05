import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Calculator, FlaskRound as Flask, Globe } from 'lucide-react';

const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: Calculator,
    color: 'bg-blue-500',
    description: 'Master numbers and problem-solving',
  },
  {
    id: 'science',
    name: 'Science',
    icon: Flask,
    color: 'bg-green-500',
    description: 'Explore the natural world',
  },
  {
    id: 'english',
    name: 'English',
    icon: BookOpen,
    color: 'bg-purple-500',
    description: 'Develop language and writing skills',
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: Globe,
    color: 'bg-orange-500',
    description: 'Discover history and geography',
  },
];

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-gray-600">Ready to continue learning?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-full ${subject.color} text-white mb-3`}>
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-xs text-gray-600 text-center mt-1">
                {subject.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="font-semibold text-blue-900 mb-2">Daily Challenge</h2>
        <p className="text-sm text-blue-700">
          Complete today's challenge to earn extra points!
        </p>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-500">
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default Home;