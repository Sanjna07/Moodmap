
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AnimationStyles = () => (
  <style>
    {`
      @keyframes float1 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(10px, -15px) rotate(5deg); }
        66% { transform: translate(-5px, -8px) rotate(-3deg); }
      }
      @keyframes float2 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(-12px, -12px) rotate(-5deg); }
        66% { transform: translate(8px, -10px) rotate(3deg); }
      }
      @keyframes float3 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(15px, -10px) rotate(3deg); }
        66% { transform: translate(-10px, -15px) rotate(-5deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(1.2); }
        to { opacity: 1; transform: scale(1); }
      }
    `}
  </style>
);

interface BreathingPattern {
  inhale: number;
  hold: number;
  exhale: number;
  name: string;
  description: string;
  color: string;
}

const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  'Basic': { 
    inhale: 4, 
    hold: 4, 
    exhale: 4, 
    name: 'Box Breathing',
    description: 'Equal parts inhale, hold, and exhale for balance',
    color: 'from-blue-400 to-purple-500'
  },
  'Relaxing': { 
    inhale: 4, 
    hold: 7, 
    exhale: 8, 
    name: '4-7-8 Breathing',
    description: 'Longer hold and exhale for deep relaxation',
    color: 'from-emerald-400 to-teal-500'
  },
  'Balanced': { 
    inhale: 5, 
    hold: 5, 
    exhale: 5, 
    name: '5-5-5 Breathing',
    description: 'Extended equal breathing for deep focus',
    color: 'from-indigo-400 to-purple-500'
  }
};

const FloatingParticle: React.FC<{ index: number }> = ({ index }) => {
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 2;
  const size = 4 + Math.random() * 4;

  return (
    <div
      className="absolute rounded-full opacity-30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'currentColor',
        animation: `float${index % 3 + 1} ${randomDuration}s ease-in-out infinite ${randomDelay}s`
      }}
    />
  );
};

const MeditationApp: React.FC = () => {
  // All state declarations
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState('Basic');
  const [sessionLength, setSessionLength] = useState(120);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [bubbleSize, setBubbleSize] = useState(1);
  const [opacity, setOpacity] = useState(0.6);
  const [particles] = useState(Array(15).fill(null));
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(0);

  const pattern = BREATHING_PATTERNS[selectedPattern];

  const getGradient = () => {
    return `bg-gradient-to-br ${pattern.color}`;
  };

  // Start session with phase timer
  const startSession = useCallback(() => {
    setIsRunning(true);
    setTimeRemaining(sessionLength);
    setTotalBreaths(0);
    setCurrentPhase('inhale');
    setBubbleSize(1);
    setOpacity(0.6);
    setPhaseTimeRemaining(BREATHING_PATTERNS[selectedPattern].inhale);
  }, [sessionLength, selectedPattern]);

  // Update phase timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPhaseTimeRemaining(time => {
        if (time <= 0) {
          const nextPhase = currentPhase === 'inhale' ? 'hold' 
                          : currentPhase === 'hold' ? 'exhale' 
                          : 'inhale';
          setCurrentPhase(nextPhase);
          if (nextPhase === 'inhale') {
            setTotalBreaths(b => b + 1);
          }
          return BREATHING_PATTERNS[selectedPattern][nextPhase];
        }
        return time - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, currentPhase, selectedPattern]);

  // Stop session
  const stopSession = useCallback(() => {
    setIsRunning(false);
    setCurrentPhase('ready');
    setBubbleSize(1);
    setOpacity(0.6);
    setPhaseProgress(0);
    setPhaseTimeRemaining(0);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }, []);

  // Session timer
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeRemaining(time => {
        if (time <= 1) {
          stopSession();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, stopSession]);

  const progress = ((sessionLength - timeRemaining) / sessionLength) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimationStyles />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Wind className="h-8 w-8 text-slate-700" />
            <h1 className="text-3xl font-serif font-semibold text-slate-700">Mindful Breathing</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto backdrop-blur-lg bg-white/90 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center">
              <div className="relative w-96 h-96 mb-8">
                {particles.map((_, index) => (
                  <FloatingParticle key={index} index={index} />
                ))}
                
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    background: `conic-gradient(${pattern.color.split(' ')[1]} ${progress}%, transparent ${progress}%)`,
                    transform: 'rotate(-90deg)',
                    opacity: 0.3
                  }}
                />
                
                <div
                  className="absolute inset-6 rounded-full transition-all duration-300"
                  style={{
                    background: `conic-gradient(${pattern.color.split(' ')[1]} ${phaseProgress}%, transparent ${phaseProgress}%)`,
                    transform: 'rotate(-90deg)',
                    opacity: 0.2
                  }}
                />
                
                <div
                  className={`absolute inset-12 rounded-full flex items-center justify-center ${getGradient()} transition-all duration-100`}
                  style={{
                    transform: `scale(${bubbleSize})`,
                    opacity: opacity,
                    boxShadow: `
                      0 0 60px ${pattern.color.split(' ')[1]}40,
                      inset 0 0 30px ${pattern.color.split(' ')[1]}30
                    `
                  }}
                >
                  <div className="text-center text-white">
                    <div className="text-3xl font-medium mb-2">
                      {isRunning ? currentPhase : 'Ready'}
                    </div>
                    {isRunning && (
                      <div className="flex flex-col items-center">
                        <div className="text-6xl font-bold mb-2" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                          {Math.ceil(phaseTimeRemaining)}
                        </div>
                        <div className="text-lg opacity-90">
                          seconds
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full space-y-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <select
                    className="px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-700 shadow-sm transition-all hover:bg-white/80"
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                    disabled={isRunning}
                  >
                    {Object.entries(BREATHING_PATTERNS).map(([key, value]) => (
                      <option key={key} value={key}>{value.name}</option>
                    ))}
                  </select>
                  <select
                    className="px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-700 shadow-sm transition-all hover:bg-white/80"
                    value={sessionLength}
                    onChange={(e) => setSessionLength(Number(e.target.value))}
                    disabled={isRunning}
                  >
                    <option value={60}>1 minute</option>
                    <option value={120}>2 minutes</option>
                    <option value={300}>5 minutes</option>
                    <option value={600}>10 minutes</option>
                  </select>
                </div>

                <Button
                  className={`w-full ${getGradient()} text-white border-none shadow-lg hover:opacity-90 transition-all`}
                  onClick={isRunning ? stopSession : startSession}
                >
                  {isRunning ? 'Stop' : 'Start'} Session
                </Button>

                <div className="text-center space-y-2 text-slate-600">
                  <p className="text-lg">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
                  </p>
                  <p className="text-lg">{totalBreaths} breaths completed</p>
                  {!isRunning && selectedPattern && (
                    <p className="text-sm mt-4 text-slate-500">{BREATHING_PATTERNS[selectedPattern].description}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeditationApp;

