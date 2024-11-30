import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { 
  Play, Pause, ChevronLeft, ChevronRight,
  Book, Code, CheckCircle, AlertCircle,
  Brain, Timer, MessageCircle
} from 'lucide-react';

const LessonDetail = () => {
  const { moduleId, sectionId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const lessonsData = {
    "arrays-intro": {
      title: "Introduction to Arrays",
      type: "video",
      duration: "15 min",
      steps: 5,
      content: {
        theory: "Arrays are fundamental data structures that store elements in contiguous memory locations. They provide constant-time access to elements using indices.",
        example: `let array = new Array(5);
array[0] = 1;
array[1] = 2;
// Accessing elements
console.log(array[0]); // Output: 1`,
        practice: "Create an array and implement basic operations like insertion and deletion."
      },
      progress: 80
    },
    "array-ops": {
      title: "Array Operations",
      type: "practice",
      duration: "25 min",
      steps: 5,
      content: {
        theory: "Array operations include insertion, deletion, searching, and traversing. Each operation has its own time complexity.",
        example: `// Array traversal
for(let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
// Array insertion
array.push(newElement);`,
        practice: "Implement array searching and sorting algorithms."
      },
      progress: 60
    },
    "linked-list": {
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
      progress: 40
    }
  };

  const lessonData = lessonsData[lessonId] || {
    title: "Lesson not found",
    type: "error",
    duration: "N/A",
    steps: 0,
    content: {
      theory: "This lesson could not be found.",
      example: "",
      practice: ""
    },
    progress: 0
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Panel - Content */}
        <div className="lg:col-span-2 space-y-6">
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
                    onClick={() => {
                      if (currentStep === 1) {
                        navigate(`/module/${moduleId}`);
                      } else {
                        setCurrentStep(prev => prev - 1);
                      }
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {currentStep === 1 ? 'Back to Module' : 'Previous Step'}
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#1428A0] text-white rounded-lg flex items-center gap-2 hover:bg-[#0075C9]"
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, lessonData.steps))}
                    disabled={currentStep === lessonData.steps}
                  >
                    {currentStep === lessonData.steps ? 'Complete' : 'Next Step'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Progress & Notes */}
        <div className="space-y-4">
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