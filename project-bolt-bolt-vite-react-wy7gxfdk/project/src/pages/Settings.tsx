import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Volume2, Moon, HelpCircle, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  const settings = [
    {
      icon: User,
      title: 'Profile',
      description: 'Update your personal information',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
    },
    {
      icon: Volume2,
      title: 'Sound',
      description: 'Adjust sound and music settings',
    },
    {
      icon: Moon,
      title: 'Theme',
      description: 'Change app appearance',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Customize your learning experience</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-blue-600">
                {user?.displayName?.[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{user?.displayName}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <button
                key={index}
                className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
              >
                <Icon className="text-gray-400" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">{setting.title}</h3>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full p-4 flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default Settings;