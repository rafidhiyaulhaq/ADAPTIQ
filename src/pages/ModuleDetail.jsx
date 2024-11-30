import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { 
  Brain, Play, Book, Award, Timer,
  CheckCircle, Lock, ChevronRight, Video,
  FileText, Code
} from 'lucide-react';

const ModuleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const modulesData = {
    1: {
      title: "Data Structures & Algorithms",
      progress: 75,
      description: "Learn fundamental data structures and algorithms with adaptive learning path",
      sections: [
        {
          id: 1,
          title: "Arrays and Lists",
          status: "completed",
          progress: 100,
          lessons: [
            {
              id: 1,
              title: "Introduction to Arrays",
              duration: "15 min",
              type: "video",
              status: "completed"
            },
            {
              id: 2,
              title: "Array Operations",
              duration: "25 min",
              type: "practice",
              status: "completed"
            }
          ]
        },
        {
          id: 2,
          title: "Linked Lists",
          status: "in-progress",
          progress: 60,
          lessons: [
            {
              id: 3,
              title: "Linked List Basics",
              duration: "20 min",
              type: "video",
              status: "completed"
            },
            {
              id: 4,
              title: "Implementing Linked Lists",
              duration: "30 min",
              type: "practice",
              status: "in-progress"
            }
          ]
        },
        {
          id: 3,
          title: "Trees and Graphs",
          status: "locked",
          progress: 0,
          lessons: [
            {
              id: 5,
              title: "Tree Data Structures",
              duration: "25 min",
              type: "video",
              status: "locked"
            },
            {
              id: 6,
              title: "Tree Traversal",
              duration: "35 min",
              type: "practice",
              status: "locked"
            }
          ]
        }
      ]
    },
    2: {
      title: "Advanced Programming Concepts",
      progress: 45,
      description: "Master advanced programming concepts and software design patterns",
      sections: [
        {
          id: 1,
          title: "Object-Oriented Programming",
          status: "in-progress",
          progress: 60,
          lessons: [
            {
              id: 7,
              title: "Classes and Objects",
              duration: "20 min",
              type: "video",
              status: "completed"
            },
            {
              id: 8,
              title: "Inheritance and Polymorphism",
              duration: "30 min",
              type: "practice",
              status: "in-progress"
            }
          ]
        },
        {
          id: 2,
          title: "Design Patterns",
          status: "locked",
          progress: 0,
          lessons: [
            {
              id: 9,
              title: "Creational Patterns",
              duration: "25 min",
              type: "video",
              status: "locked"
            },
            {
              id: 10,
              title: "Structural Patterns",
              duration: "35 min",
              type: "practice",
              status: "locked"
            }
          ]
        },
        {
          id: 3,
          title: "System Architecture",
          status: "locked",
          progress: 0,
          lessons: [
            {
              id: 11,
              title: "Architecture Patterns",
              duration: "30 min",
              type: "video",
              status: "locked"
            },
            {
              id: 12,
              title: "System Design",
              duration: "40 min",
              type: "practice",
              status: "locked"
            }
          ]
        }
      ]
    }
  };

  const moduleData = modulesData[id];

  if (!moduleData) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Module not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      {/* Module Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#1428A0]" />
              <CardTitle>{moduleData.title}</CardTitle>
            </div>
            <span className="text-sm text-blue-600">{moduleData.progress}% Complete</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{moduleData.description}</p>
          <Progress value={moduleData.progress} />
        </CardContent>
      </Card>

      {/* Module Sections */}
      <div className="space-y-6">
        {moduleData.sections.map((section) => (
          <Card key={section.id} className={`${
            section.status === 'locked' ? 'opacity-60' : ''
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {section.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {section.status === 'in-progress' && <Play className="w-5 h-5 text-blue-500" />}
                  {section.status === 'locked' && <Lock className="w-5 h-5 text-gray-500" />}
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                <span className="text-sm text-gray-600">{section.progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    disabled={lesson.status === 'locked'}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    className={`w-full p-4 rounded-lg border flex items-center justify-between hover:shadow-md transition-shadow ${
                      lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === 'video' && <Video className="w-5 h-5 text-blue-500" />}
                      {lesson.type === 'practice' && <Code className="w-5 h-5 text-green-500" />}
                      <div className="text-left">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                    {lesson.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleDetail;