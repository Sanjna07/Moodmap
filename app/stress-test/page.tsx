
"use client";
import React, { useState } from 'react';
import { Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "How often do you feel overwhelmed with your daily tasks?",
    options: [
      { text: "Rarely", points: 1 },
      { text: "Sometimes", points: 2 },
      { text: "Often", points: 3 },
      { text: "Almost always", points: 4 }
    ]
  },
  {
    id: 2,
    text: "How well do you sleep at night?",
    options: [
      { text: "Very well", points: 1 },
      { text: "Okay, but could be better", points: 2 },
      { text: "Often disturbed", points: 3 },
      { text: "Hardly at all", points: 4 }
    ]
  },
  {
    id: 3,
    text: "How often do you find it hard to concentrate on work or studies?",
    options: [
      { text: "Rarely", points: 1 },
      { text: "Sometimes", points: 2 },
      { text: "Frequently", points: 3 },
      { text: "Almost always", points: 4 }
    ]
  },
  {
    id: 4,
    text: "How do you feel about your ability to manage time effectively?",
    options: [
      { text: "Very confident", points: 1 },
      { text: "Somewhat confident", points: 2 },
      { text: "Struggle at times", points: 3 },
      { text: "Completely overwhelmed", points: 4 }
    ]
  },
  {
    id: 5,
    text: "How often do you feel irritated or angry for no clear reason?",
    options: [
      { text: "Rarely", points: 1 },
      { text: "Sometimes", points: 2 },
      { text: "Often", points: 3 },
      { text: "Almost always", points: 4 }
    ]
  },
  {
    id: 6,
    text: "How do you feel about your current level of energy during the day?",
    options: [
      { text: "Very energetic", points: 1 },
      { text: "Somewhat energetic", points: 2 },
      { text: "Frequently tired", points: 3 },
      { text: "Exhausted", points: 4 }
    ]
  },
  {
    id: 7,
    text: "How often do you feel nervous or anxious?",
    options: [
      { text: "Rarely", points: 1 },
      { text: "Occasionally", points: 2 },
      { text: "Often", points: 3 },
      { text: "Almost always", points: 4 }
    ]
  },
  {
    id: 8,
    text: "How often do you engage in activities that make you feel relaxed or happy?",
    options: [
      { text: "Almost daily", points: 1 },
      { text: "A few times a week", points: 2 },
      { text: "Rarely", points: 3 },
      { text: "Never", points: 4 }
    ]
  },
  {
    id: 9,
    text: "How do you feel about your interactions with family or friends?",
    options: [
      { text: "Very positive and fulfilling", points: 1 },
      { text: "Somewhat okay", points: 2 },
      { text: "Often strained", points: 3 },
      { text: "Completely disconnected", points: 4 }
    ]
  },
  {
    id: 10,
    text: "How often do you feel hopeful about your future?",
    options: [
      { text: "Almost always", points: 1 },
      { text: "Sometimes", points: 2 },
      { text: "Rarely", points: 3 },
      { text: "Never", points: 4 }
    ]
  }
];

const getResultCategory = (score) => {
  if (score <= 18) return {
    category: "Relaxed and Balanced",
    description: "You seem to be managing stress effectively and are in a positive mental state.",
    color: "text-green-600"
  };
  if (score <= 26) return {
    category: "Mildly Stressed",
    description: "You are experiencing some stress but are coping relatively well. Consider small changes to improve balance.",
    color: "text-blue-600"
  };
  if (score <= 34) return {
    category: "Stressed",
    description: "You are feeling significant stress. It's important to focus on self-care and seek support if needed.",
    color: "text-yellow-600"
  };
  return {
    category: "Highly Stressed or Burnt Out",
    description: "Your stress level is very high, which might be affecting your well-being. Professional help and active stress management strategies are recommended.",
    color: "text-rose-600"
  };
};

export default function StressCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (points) => {
    setSelectedOption(points);
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, points];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 500);
  };

  const totalScore = answers.reduce((sum, current) => sum + current, 0);
  const result = getResultCategory(totalScore);
  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden text-slate-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(244,230,255,0.8),rgba(255,240,245,0.4))]">
          <div className="absolute inset-0 bg-grid-slate-200/50" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-4 border border-rose-200 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Heart className="h-5 w-5 text-rose-400 mr-2 animate-pulse" />
            <span className="text-sm font-medium text-rose-600">Stress Check Assessment</span>
          </div>
          
          {!showResults && (
            <div className="mb-8 transform transition-transform duration-300">
              <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-400 to-violet-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          )}
        </div>

        <div className={`transform transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`}>
          {!showResults ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-slate-700 mb-6">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.points)}
                    className={`
                      w-full text-left p-4 rounded-lg bg-white 
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-lg
                      border border-rose-100 hover:border-rose-300
                      ${selectedOption === option.points ? 'scale-95 bg-rose-50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between group">
                      <span className="text-lg text-slate-700 group-hover:text-rose-600 transition-colors duration-300">
                        {option.text}
                      </span>
                      <ArrowRight className="h-5 w-5 text-rose-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold mb-2">Assessment Complete</h2>
                <div className="w-full h-2 bg-rose-100 rounded-full mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 to-violet-400 rounded-full" 
                    style={{ width: '100%' }} 
                  />
                </div>
                
                <div className="mb-6">
                  <p className="text-xl mb-2">Your Score: <span className="font-bold">{totalScore}/40</span></p>
                  <h3 className={`text-2xl font-bold mb-2 ${result.color}`}>
                    {result.category}
                  </h3>
                  <p className="text-slate-600">{result.description}</p>
                </div>
                
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowResults(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-rose-400 to-violet-400 text-white rounded-full font-semibold
                    transition-all duration-300 transform 
                    hover:scale-105 hover:shadow-lg hover:from-rose-500 hover:to-violet-500
                    active:scale-95"
                >
                  Take Assessment Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

