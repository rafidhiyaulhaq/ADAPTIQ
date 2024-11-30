import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { 
  Timer, Brain, AlertCircle, CheckCircle, 
  ArrowRight, ArrowLeft, AlertTriangle
} from 'lucide-react';

const AssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(2700);
  const [userSkillLevel, setUserSkillLevel] = useState(0.5);
  const [questionDifficulty, setQuestionDifficulty] = useState('medium');
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionHistory, setQuestionHistory] = useState({});

  const assessmentData = {
    1: {
      title: "Data Structures Mid-Module",
      type: "Adaptive Assessment",
      totalQuestions: 20,
      duration: 45,
      questions: [
        {
          id: 1,
          question: "What is the time complexity of searching in a binary search tree?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correctAnswer: 1,
          difficulty: "medium",
          explanation: "Binary search tree performs binary search, dividing the search space in half each time."
        },
        {
          id: 2,
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Linked List", "Array"],
          correctAnswer: 1,
          difficulty: "easy",
          explanation: "Stack follows Last-In-First-Out (LIFO) principle where the last element added is the first one to be removed."
        },
        {
          id: 3,
          question: "What is the space complexity of an adjacency matrix for a graph with n vertices?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(2^n)"],
          correctAnswer: 1,
          difficulty: "hard",
          explanation: "An adjacency matrix requires n×n space to store connections between n vertices."
        },
        {
          id: 4,
          question: "Which operation in a binary search tree has O(h) time complexity, where h is the height of the tree?",
          options: ["Insertion", "Deletion", "Search", "All of the above"],
          correctAnswer: 3,
          difficulty: "medium",
          explanation: "All basic operations in a BST traverse a single path from root to leaf, taking O(h) time."
        }
      ]
    },
    2: {
      title: "Algorithm Analysis",
      type: "Practice Assessment",
      totalQuestions: 15,
      duration: 60,
      questions: [
        {
          id: 1,
          question: "What is the worst-case time complexity of quicksort?",
          options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
          correctAnswer: 1,
          difficulty: "hard",
          explanation: "Quicksort's worst case occurs when the pivot is always the smallest/largest element."
        },
        {
          id: 2,
          question: "In a min-heap, what is true about the root node?",
          options: [
            "It's the largest element",
            "It's the smallest element",
            "It's the median element",
            "None of the above"
          ],
          correctAnswer: 1,
          difficulty: "medium",
          explanation: "In a min-heap, the root node is always the smallest element in the heap."
        }
      ]
    }
  };

  const assessment = assessmentData[id];

  useEffect(() => {
    const questionId = assessment?.questions[currentQuestion]?.id;
    if (questionId && !questionHistory[questionId]) {
      const difficulty = assessment.questions[currentQuestion].difficulty;
      setQuestionDifficulty(difficulty);
      setQuestionHistory(prev => ({
        ...prev,
        [questionId]: difficulty
      }));
    } else if (questionId) {
      setQuestionDifficulty(questionHistory[questionId]);
    }
  }, [currentQuestion, assessment]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (answers[assessment?.questions[currentQuestion]?.id] !== undefined) {
      updateDifficulty(
        answers[assessment.questions[currentQuestion].id] === 
        assessment.questions[currentQuestion].correctAnswer
      );
    }
  }, [answers]);

  const handleTimeUp = () => {
    setShowWarning(true);
    setTimeout(() => {
      handleSubmitAssessment();
    }, 3000);
  };

  const updateDifficulty = (isCorrect) => {
    const nextQuestion = assessment?.questions[currentQuestion + 1];
    if (!nextQuestion) return;

    if (isCorrect) {
      setUserSkillLevel(prev => Math.min(prev + 0.1, 1));
      setQuestionHistory(prev => ({
        ...prev,
        [nextQuestion.id]: 
          questionDifficulty === 'easy' ? 'medium' :
          questionDifficulty === 'medium' ? 'hard' : 'hard'
      }));
    } else {
      setUserSkillLevel(prev => Math.max(prev - 0.1, 0));
      setQuestionHistory(prev => ({
        ...prev,
        [nextQuestion.id]: 
          questionDifficulty === 'hard' ? 'medium' :
          questionDifficulty === 'medium' ? 'easy' : 'easy'
      }));
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitAssessment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const score = calculateScore();
    const assessmentResult = {
      assessmentId: id,
      answers,
      score,
      timeSpent: assessment.duration * 60 - timeLeft,
      skillLevel: userSkillLevel,
      completedAt: new Date().toISOString(),
      questionHistory: questionHistory
    };

    console.log('Assessment submitted:', assessmentResult);
    navigate(`/assessment/${id}/results`, { state: { result: assessmentResult } });
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessment.questions.find(q => q.id === parseInt(questionId));
      if (question && answer === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / assessment.questions.length) * 100;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!assessment) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Assessment not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-medium">Time's Up!</h3>
              </div>
              <p className="text-gray-600">
                Your assessment will be submitted automatically in a few seconds.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#1428A0]" />
              <div>
                <CardTitle>{assessment.title}</CardTitle>
                <p className="text-sm text-gray-500">{assessment.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#1428A0]" />
                <span className={`text-sm font-medium ${
                  timeLeft < 300 ? 'text-red-500' : ''
                }`}>{formatTime(timeLeft)}</span>
              </div>
              <Progress value={(currentQuestion / assessment.questions.length) * 100} className="w-32" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded ${
                questionDifficulty === 'easy' ? 'bg-green-100 text-green-700' :
                questionDifficulty === 'medium' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {questionDifficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-medium">
              {assessment.questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {assessment.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left border rounded-lg transition-all ${
                  answers[assessment.questions[currentQuestion].id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-400'
                }`}
                onClick={() => handleAnswerSelect(assessment.questions[currentQuestion].id, index)}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(prev => prev - 1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          className="px-4 py-2 bg-[#1428A0] text-white rounded-lg flex items-center gap-2 hover:bg-[#0075C9]"
          onClick={() => {
            if (currentQuestion === assessment.questions.length - 1) {
              handleSubmitAssessment();
            } else {
              setCurrentQuestion(prev => prev + 1);
            }
          }}
          disabled={isSubmitting}
        >
          {currentQuestion === assessment.questions.length - 1 ? (
            isSubmitting ? 'Submitting...' : 'Submit'
          ) : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AssessmentDetail;