import React, { useState, useEffect } from 'react';
import { Trophy, Star, Gift } from 'lucide-react';

const RewardAnimation = ({ show, reward, onClose }) => {
  const [animation, setAnimation] = useState('scale-0');

  useEffect(() => {
    if (show) {
      // Start animation
      setAnimation('scale-100');
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        setAnimation('scale-0');
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className={`relative bg-white rounded-2xl p-8 transform transition-transform duration-300 ${animation}`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <Star className="w-24 h-24 text-yellow-400 opacity-50" />
            </div>
            <Star className="w-24 h-24 text-yellow-400" />
          </div>
        </div>
        
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center">
            {reward.type === 'badge' && (
              <div className="p-4 bg-blue-50 rounded-full">
                <Trophy className="w-12 h-12 text-blue-500" />
              </div>
            )}
            {reward.type === 'xp' && (
              <div className="p-4 bg-green-50 rounded-full">
                <Gift className="w-12 h-12 text-green-500" />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {reward.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {reward.description}
            </p>
          </div>

          {reward.type === 'xp' && (
            <div className="text-3xl font-bold text-green-500">
              +{reward.amount} XP
            </div>
          )}

          <div className="animate-bounce">
            🎉
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardAnimation;