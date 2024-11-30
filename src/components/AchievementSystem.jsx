import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Trophy, Star, Target, Zap, Award, Medal, Crown } from 'lucide-react';
import WeeklyChallenges from './WeeklyChallenges';

const AchievementSystem = () => {
  const achievements = {
    badges: [
      {
        id: 1,
        icon: Star,
        title: "Quick Learner",
        description: "Complete 5 lessons in a day",
        progress: 80,
        achieved: true,
        color: "text-yellow-500"
      },
      {
        id: 2,
        icon: Target,
        title: "Perfect Score",
        description: "Get 100% in any assessment",
        progress: 60,
        achieved: false,
        color: "text-blue-500"
      },
      {
        id: 3,
        icon: Zap,
        title: "Study Streak",
        description: "Learn for 7 days in a row",
        progress: 100,
        achieved: true,
        color: "text-purple-500"
      },
      {
        id: 4,
        icon: Award,
        title: "Knowledge Master",
        description: "Complete all modules in a course",
        progress: 45,
        achieved: false,
        color: "text-green-500"
      }
    ],
    level: {
      current: 4,
      progress: 65,
      title: "Advanced Learner",
      nextMilestone: "Expert"
    },
    stats: {
      totalPoints: 1250,
      streak: 15,
      badgesEarned: 8,
      ranking: "Silver"
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Level {achievements.level.current} - {achievements.level.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1428A0] to-[#0075C9]"
                  style={{ width: `${achievements.level.progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{achievements.level.progress}%</span>
            </div>
            <p className="text-sm text-gray-600">
              Next milestone: {achievements.level.nextMilestone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: "Total Points", value: achievements.stats.totalPoints },
          { icon: Zap, label: "Day Streak", value: achievements.stats.streak },
          { icon: Medal, label: "Badges", value: achievements.stats.badgesEarned },
          { icon: Crown, label: "Rank", value: achievements.stats.ranking }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <stat.icon className="w-6 h-6 text-[#1428A0] mb-2" />
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.badges.map((badge) => (
              <div 
                key={badge.id}
                className={`p-4 rounded-lg border ${
                  badge.achieved ? 'bg-white' : 'bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-50 ${badge.color}`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{badge.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#1428A0] to-[#0075C9]"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{badge.progress}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <WeeklyChallenges />
    </div>
  );
};

export default AchievementSystem;