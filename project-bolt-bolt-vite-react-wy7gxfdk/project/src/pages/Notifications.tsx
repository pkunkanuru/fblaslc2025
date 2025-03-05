import React from 'react';
import { Bell, Trophy, Star, BookOpen } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'achievement',
    icon: Trophy,
    title: 'New Achievement Unlocked!',
    message: 'Completed 5 math challenges in a row',
    time: '2 hours ago',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 2,
    type: 'progress',
    icon: Star,
    title: 'Level Up!',
    message: "You've reached Level 5 in Science",
    time: '1 day ago',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'reminder',
    icon: BookOpen,
    title: 'Daily Challenge Available',
    message: 'New English vocabulary challenge ready',
    time: 'Just now',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

const Notifications: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <Bell className="text-gray-400" size={24} />
        </div>
        <p className="text-gray-600">Stay updated with your learning progress</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${notification.bgColor}`}>
                  <Icon className={notification.color} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full p-4 text-center text-gray-600 hover:text-gray-900">
        View All Notifications
      </button>
    </div>
  );
};

export default Notifications;