import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { 
  Play, Pause, ChevronLeft, ChevronRight,
  Book, Code, CheckCircle, AlertCircle,
  Brain, Timer, MessageCircle
} from 'lucide-react';

const LessonDetail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const lessonData = {
    title: "Linked List Implementation",
    type: "practice",
    duration: "30 min",
    steps: 5,
    content: {
      theory: `A linked list is a linear data structure where elements are stored in nodes, 
               and each node points to the next node in the sequence. Unlike arrays, linked 
               lists do not store elements in contiguous memory locations.`,
      example: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}`,
      practice: "Implement a method to insert a new node at the beginning of the linked list."
    },
    progress: 60
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#1428A0]" />
              <CardTitle>{lessonData.title}</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <Timer className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">{lessonData.duration}</span>
              <Progress value={lessonData.progress} className="w-32" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - Content */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step {currentStep} of {lessonData.steps}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Theory Section */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Theory</h3>
                  <p className="text-gray-600">{lessonData.content.theory}</p>
                </div>

                {/* Example Section */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Example</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                    <code>{lessonData.content.example}</code>
                  </pre>
                </div>

                {/* Practice Section */}
                <div>
                  <h3 className="font-medium mb-2">Practice</h3>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-600 mb-4">{lessonData.content.practice}</p>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                      {/* Code Editor Component would go here */}
                      <textarea 
                        className="w-full h-full bg-transparent outline-none resize-none"
                        placeholder="Write your code here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-6">
                  <button 
                    className="px-4 py-2 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Step
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#1428A0] text-white rounded-lg flex items-center gap-2 hover:bg-[#0075C9]"
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, lessonData.steps))}
                    disabled={currentStep === lessonData.steps}
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Progress & Notes */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: lessonData.steps}).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index + 1 < currentStep ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : index + 1 === currentStep ? (
                      <Play className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={`text-sm ${
                      index + 1 === currentStep ? 'text-blue-600 font-medium' : 'text-gray-600'
                    }`}>
                      Step {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-32 p-3 border rounded-lg resize-none"
                placeholder="Take notes here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;