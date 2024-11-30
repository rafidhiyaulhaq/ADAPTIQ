import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Target, Gift, Timer, Star, Trophy } from 'lucide-react';

const WeeklyChallenges = () => {
  const challenges = [
    {
      id: 1,
      title: "Algorithm Master",
      description: "Complete 5 algorithm challenges",
      reward: "100 XP",
      progress: 60,
      deadline: "2 days left",
      type: "daily",
      icon: Target,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Study Marathon",
      description: "Study for total 5 hours this week",
      reward: "250 XP",
      progress: 75,
      deadline: "4 days left",
      type: "weekly",
      icon: Timer,
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Get 100% on any assessment",
      reward: "Special Badge",
      progress: 0,
      deadline: "5 days left",
      type: "special",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#1428A0]" />
          Weekly Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${challenge.color}`}>
                  <challenge.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <Gift className="w-4 h-4 text-[#1428A0]" />
                      <span className="text-sm font-medium text-[#1428A0]">{challenge.reward}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-800 font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} />
                    <div className="flex justify-between items-center text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        challenge.type === 'daily' ? 'bg-blue-100 text-blue-700' :
                        challenge.type === 'weekly' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                      </span>
                      <span className="text-gray-500">{challenge.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyChallenges;