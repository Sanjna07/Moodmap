"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Phone, Mail, Calendar, Heart, Smile, Meh, Frown, Star, Sparkles, Moon } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const moodData = [
  { date: 'Mon', score: 7 },
  { date: 'Tue', score: 8 },
  { date: 'Wed', score: 6 },
  { date: 'Thu', score: 9 },
  { date: 'Fri', score: 7 },
  { date: 'Sat', score: 8 },
  { date: 'Sun', score: 9 },
];

const getMoodIcon = (score) => {
  if (score >= 7) return <Smile className="w-8 h-8 text-rose-400" />;
  if (score >= 5) return <Meh className="w-8 h-8 text-yellow-400" />;
  return <Frown className="w-8 h-8 text-red-400" />;
};

const getMoodText = (score) => {
  if (score >= 7) return "Happy";
  if (score >= 5) return "Neutral";
  return "Sad";
};

export default function UserDashboard() {
  const currentMood = 8;
  const [floatingElements, setFloatingElements] = useState([]);
  const session=useSession();
  console.log(session)

  useEffect(() => {
    axios.get("/api/userInfo").then((res)=>{
      console.log(res.data)
    })
    setFloatingElements(
      Array(8).fill(null).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotate: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 p-6 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-floating"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.7}s`,
              transform: `rotate(${pos.rotate}deg)`,
              opacity: 0.15
            }}
          >
            {i % 3 === 0 ? (
              <Moon className="h-16 w-16 text-rose-300 animate-pulse" />
            ) : i % 3 === 1 ? (
              <Star className="h-12 w-12 text-violet-300 animate-twinkle" />
            ) : (
              <Sparkles className="h-10 w-10 text-pink-300 animate-sparkle" />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floating {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -15px) rotate(5deg); }
          50% { transform: translate(-10px, 20px) rotate(-5deg); }
          75% { transform: translate(-15px, -10px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="bg-white/80 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-slate-700">
                <User className="w-5 h-5 text-rose-400" />
                <span>{session.data?.user?.name||"John Doe"}</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-700">
                <Mail className="w-5 h-5 text-rose-400" />
                <span>{session.data?.user?.email||"john.doe@example.com"}</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-700">
                <Phone className="w-5 h-5 text-rose-400" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-700">
                <Calendar className="w-5 h-5 text-rose-400" />
                <span>28 years old</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-700">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>Male</span>
              </div>
            </CardContent>
          </Card>

          {/* Current Mood Score */}
          <Card className="bg-white/80 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                Current Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                {currentMood}/10
              </div>
              <div className="text-xl text-slate-700 flex items-center space-x-2">
                {getMoodIcon(currentMood)}
                <span>{getMoodText(currentMood)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Mood Statistics */}
          <Card className="bg-white/80 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                Mood Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-slate-700">
                <p className="mb-2">Weekly Average: 7.8/10</p>
                <p className="mb-2">Most Common Mood: Happy</p>
                <p>Entries This Week: 7</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Graph */}
        <Card className="mt-6 bg-white/80 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
              Mood History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                  />
                  <YAxis 
                    stroke="#6B7280"
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #FDA4AF',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#6B7280' }}
                    itemStyle={{ color: '#E11D48' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#E11D48"
                    strokeWidth={2}
                    dot={{ fill: '#E11D48', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#BE123C' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

