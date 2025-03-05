import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Bell } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
      <div className="flex justify-around items-center">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center p-2 ${
            isActive('/notifications') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Bell size={24} />
          <span className="text-xs mt-1">Notifications</span>
        </Link>

        <Link
          to="/settings"
          className={`flex flex-col items-center p-2 ${
            isActive('/settings') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;