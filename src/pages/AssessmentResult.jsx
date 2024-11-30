import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Trophy, Clock, Target, Brain } from 'lucide-react';

const AssessmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Assessment Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Score */}
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-50">
              <div>
                <h2 className="text-4xl font-bold text-[#1428A0]">{result.score.toFixed(1)}%</h2>
                <p className="text-sm text-gray-600 mt-1">Overall Score</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time Spent</p>
                    <p className="font-semibold">{Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Skill Level</p>
                    <p className="font-semibold">{(result.skillLevel * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Questions Completed</p>
                    <p className="font-semibold">{Object.keys(result.answers).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Difficulty Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(result.questionHistory).map(([questionId, difficulty]) => (
                  <div key={questionId} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Question {questionId}:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      difficulty === 'medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {difficulty.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate(`/assessment/${result.assessmentId}`)}
              className="px-6 py-2 bg-[#1428A0] text-white rounded-lg hover:bg-[#0075C9] transition-colors"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResult;