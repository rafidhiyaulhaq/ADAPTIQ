import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Brain, Target, LineChart as ChartIcon, Calendar, Clock, Zap, BookOpen, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AnalyticsDashboard = ({ learningData }) => {
  // Sample data - nanti bisa disambungkan dengan real data
  const progressData = [
    { month: 'Jan', progress: 65, difficulty: 'medium' },
    { month: 'Feb', progress: 75, difficulty: 'medium' },
    { month: 'Mar', progress: 85, difficulty: 'hard' },
    { month: 'Apr', progress: 82, difficulty: 'hard' },
    { month: 'May', progress: 90, difficulty: 'hard' }
  ];

  const skillData = [
    { skill: 'Problem Solving', score: 85 },
    { skill: 'Critical Thinking', score: 78 },
    { skill: 'Data Analysis', score: 92 },
    { skill: 'Algorithm Design', score: 70 },
    { skill: 'Code Implementation', score: 88 }
  ];

  const studyPatternData = [
    { time: '6am-9am', efficiency: 85, sessions: 12 },
    { time: '9am-12pm', efficiency: 92, sessions: 15 },
    { time: '12pm-3pm', efficiency: 78, sessions: 8 },
    { time: '3pm-6pm', efficiency: 88, sessions: 10 },
    { time: '6pm-9pm', efficiency: 72, sessions: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Average Performance',
            value: '85.4%',
            change: '+5.2%',
            icon: ChartIcon,
            color: 'blue'
          },
          {
            title: 'Learning Streak',
            value: '15 days',
            change: '+3 days',
            icon: Zap,
            color: 'yellow'
          },
          {
            title: 'Topics Mastered',
            value: '12/15',
            change: '+2 this week',
            icon: BookOpen,
            color: 'green'
          },
          {
            title: 'Achievements',
            value: '8 earned',
            change: 'Silver tier',
            icon: Award,
            color: 'purple'
          }
        ].map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Progress & Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#1428A0" 
                    strokeWidth={2}
                    dot={{ fill: '#1428A0' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Study Pattern Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyPatternData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#0075C9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Radar & AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Skill Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="#1428A0"
                    fill="#1428A0"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Learning Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Optimal Learning Style</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Visual learning with interactive examples shows highest engagement
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Recommended Focus Areas</h4>
                <p className="text-sm text-green-700 mt-1">
                  Algorithm complexity and dynamic programming concepts need attention
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Peak Performance Times</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Your best learning hours are between 9 AM - 11 AM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;