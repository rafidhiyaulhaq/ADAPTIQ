import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { 
  Brain, 
  Timer, 
  Award, 
  Target, 
  Book,
  Video,
  FileText,
  BarChart2,
  CheckCircle
} from 'lucide-react';
import AdaptiveModel from '../services/ai/AdaptiveModel';
import LearningAnalytics from '../services/ai/LearningAnalytics';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import AchievementSystem from '../components/AchievementSystem';

const Dashboard = () => {
  const navigate = useNavigate();
  const [learningInsights, setLearningInsights] = useState({
    learningStyle: null,
    strongAreas: [],
    weakAreas: [],
    recommendedTopics: [],
    optimalLearningTime: null,
    studySchedule: [],
    practiceAreas: []
  });

  useEffect(() => {
    const analyzeLearning = async () => {
      const userBehavior = {
        videoWatchTime: 120,
        practiceTime: 90,
        readingTime: 60,
        interactionRate: 0.8,
        completionRate: 0.75
      };

      try {
        const learningStyle = await AdaptiveModel.predictLearningStyle(userBehavior);
        
        const analytics = LearningAnalytics.analyzePerformance({
          topics: [
            { name: 'Arrays', completedLessons: 8, totalLessons: 10, score: 85, timeSpent: 120 },
            { name: 'Linked Lists', completedLessons: 4, totalLessons: 8, score: 70, timeSpent: 90 }
          ],
          sessions: [
            { timestamp: '2024-03-20T09:00:00', score: 85, engagementLevel: 0.9 },
            { timestamp: '2024-03-20T14:00:00', score: 75, engagementLevel: 0.7 }
          ],
          interactions: [
            { type: 'video', duration: 30, completion: 1 },
            { type: 'practice', duration: 45, completion: 0.8 },
            { type: 'text', duration: 20, completion: 0.9 }
          ]
        });

        setLearningInsights({ learningStyle, ...analytics });
      } catch (error) {
        console.error('Error analyzing learning data:', error);
      }
    };

    analyzeLearning();
  }, []);
  const assessmentData = {
    upcoming: [
      {
        id: 1,
        title: "Data Structures Mid-Module",
        type: "Adaptive Assessment",
        duration: 45,
        questions: 20,
        difficulty: "Dynamic",
        recommendedTime: "Morning",
        prerequisites: ["Arrays", "Linked Lists"],
        estimatedScore: 85
      },
      {
        id: 2,
        title: "Algorithm Analysis",
        type: "Practice Assessment",
        duration: 60,
        questions: 15,
        difficulty: "Intermediate",
        recommendedTime: "Afternoon",
        prerequisites: ["Time Complexity", "Space Complexity"],
        estimatedScore: 80
      }
    ],
    completed: [
      {
        id: 3,
        title: "Programming Fundamentals",
        score: 92,
        improvement: "+15%",
        completedDate: "Mar 15, 2024",
        strengthAreas: ["Syntax", "Control Flow"],
        weakAreas: ["Functions"],
        timeSpent: 40
      },
      {
        id: 4,
        title: "Basic Data Types",
        score: 85,
        improvement: "+8%",
        completedDate: "Mar 10, 2024",
        strengthAreas: ["Primitives", "Arrays"],
        weakAreas: ["Objects"],
        timeSpent: 35
      }
    ]
  };

  const learningPathData = {
    modules: [
      {
        id: 1,
        title: "Data Structures & Algorithms",
        progress: 75,
        topics: [
          "Arrays and Lists",
          "Linked Lists",
          "Trees and Graphs"
        ],
        estimatedTime: "4 weeks",
        difficulty: "Intermediate",
        prerequisites: ["Basic Programming"]
      },
      {
        id: 2,
        title: "Advanced Programming Concepts",
        progress: 45,
        topics: [
          "Object-Oriented Programming",
          "Design Patterns",
          "System Architecture"
        ],
        estimatedTime: "6 weeks",
        difficulty: "Advanced",
        prerequisites: ["Data Structures"]
      }
    ]
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="w-full px-6 py-8 bg-gradient-to-r from-[#1428A0] to-[#0075C9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="w-10 h-10 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">ADAPTIQ</h1>
                <p className="text-blue-100">Learn Smarter, Not Harder</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-white">
                <p className="font-medium">Welcome back</p>
                <p className="text-sm text-blue-100">Your learning journey continues</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="learning" className="space-y-8">
        <TabsList className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-lg w-full max-w-2xl mx-auto">
          {['learning', 'assessment', 'analytics', 'achievements', 'resources'].map((tab) => (
            <TabsTrigger 
              key={tab}
              value={tab}
              className="min-w-[110px] py-2 px-3 text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1428A0] capitalize"
            >
              {tab}
            </TabsTrigger>
          ))}
          </TabsList>

          <TabsContent value="learning">
            <div className="grid gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-6 h-6 text-[#1428A0]" />
                      AI Learning Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">
                          Your optimal learning style is{' '}
                          <span className="font-medium">{learningInsights.learningStyle}</span>
                        </p>
                        {learningInsights.strongAreas.length > 0 && (
                          <p className="text-sm text-blue-600 mt-2">
                            Strong areas: {learningInsights.strongAreas.join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Overall Progress</p>
                          <span className="text-sm text-blue-600">75% Complete</span>
                        </div>
                        <Progress value={75} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-white">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-[#1428A0]" />
                        <span className="text-sm">2.5h Today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#1428A0]" />
                        <span className="text-sm">85% Accuracy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#1428A0]" />
                        <span className="text-sm">Level 4</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningPathData.modules.map((module) => (
                  <Card 
                    key={module.id}
                    onClick={() => navigate(`/module/${module.id}`)}
                    className="hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle>{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={module.progress} className="mb-4" />
                      <div className="flex gap-2 flex-wrap">
                        {module.topics.map((topic, index) => (
                          <span 
                            key={index} 
                            className={`text-sm px-3 py-1 rounded-full ${
                              learningInsights.strongAreas.includes(topic)
                                ? 'bg-green-100 text-green-700'
                                : learningInsights.weakAreas.includes(topic)
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2 text-sm text-gray-500">
                        <span>{module.estimatedTime}</span>
                        <span>·</span>
                        <span>{module.difficulty}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          {/* Assessment Tab */}
          <TabsContent value="assessment">
            <div className="grid gap-8">
              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-[#1428A0]" />
                    Upcoming Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {assessmentData.upcoming.map((assessment) => (
                    <div key={assessment.id} className="p-6 border-b last:border-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{assessment.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{assessment.type}</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/assessment/${assessment.id}`)}
                          className="px-4 py-2 bg-gradient-to-r from-[#1428A0] to-[#0075C9] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Start Assessment
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { icon: Timer, text: `${assessment.duration} minutes` },
                          { icon: Target, text: `${assessment.questions} questions` },
                          { icon: Award, text: assessment.difficulty }
                        ].map(({ icon: Icon, text }, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon className="w-4 h-4" />
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Analytics Tab */}
              <Card>
                <CardHeader>
                  <CardTitle>Previous Results</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {assessmentData.completed.map((result) => (
                    <div key={result.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{result.title}</h4>
                          <p className="text-sm text-gray-500">{result.completedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{result.score}%</p>
                          <p className="text-sm text-green-500">{result.improvement}</p>
                        </div>
                      </div>
                      <Progress value={result.score} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard learningData={learningInsights} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementSystem />
          </TabsContent>         

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Video, title: "Video Tutorials", desc: "Interactive video lessons" },
                { icon: FileText, title: "Documentation", desc: "Comprehensive guides" },
                { icon: Book, title: "Practice Exercises", desc: "Hands-on learning" },
                { icon: BarChart2, title: "Performance Analytics", desc: "Track your progress" }
              ].map(({ icon: Icon, title, desc }, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#1428A0]" />
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
