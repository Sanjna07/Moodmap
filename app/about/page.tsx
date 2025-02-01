
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Send, 
  Heart, 
  Brain, 
  Target, 
  UserCheck, 
  Moon, 
  Star, 
  Sparkles,
  Code,
  Database,
  Search,
  Cpu,
  Flame
} from 'lucide-react';

const teamMembers = [
  { 
    name: "Anshul Bhathija", 
    role: "Frontend Developer",
    bio: "Leading research in cognitive neuroscience and mental health innovations",
    icon: <Code className="w-8 h-8" />
  },
  { 
    name: "Sanjana Kumari", 
    role: "Frontend Developer",
    bio: "Ensuring responsible development of AI in mental healthcare applications",
    icon: <Code className="w-8 h-8" />
  },
  { 
    name: "Mukul Gupta", 
    role: "Backend developer",
    bio: "Expert in cognitive behavioral therapy and trauma-informed care",
    icon: <Database className="w-8 h-8" />
  },
  { 
    name: "Tanisha Gupta", 
    role: "Leading Researcher",
    bio: "Architecting innovative solutions for mental health platforms",
    icon: <Search className="w-8 h-8" />
  },
  { 
    name: "Anurag Gautam", 
    role: "AI innovator",
    bio: "Specializes in holistic approaches to stress management and mindfulness",
    icon: <Cpu className="w-8 h-8" />
  },
  { 
    name: "Ruchit Kansal", 
    role: "Backend Developer",
    bio: "Overseeing clinical programs and therapeutic implementations",
    icon: <Database className="w-8 h-8" />
  }
];

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Evidence-Based Techniques",
    description: "Scientifically proven methods for stress management"
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Personalized AI Recommendations",
    description: "Tailored strategies based on your unique stress patterns"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Progress Tracking",
    description: "Monitor your journey to better mental wellness"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Holistic Approach",
    description: "Combining mindfulness with cognitive behavioral strategies"
  }
];

export default function About() {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setFloatingElements(
      Array(15).fill(null).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotate: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden text-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(244,230,255,0.8),rgba(255,240,245,0.4))]" />
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
            {i % 4 === 0 ? (
              <Moon className="h-16 w-16 text-rose-300 animate-pulse" />
            ) : i % 4 === 1 ? (
              <Star className="h-12 w-12 text-violet-300 animate-twinkle" />
            ) : i % 4 === 2 ? (
              <Sparkles className="h-10 w-10 text-pink-300 animate-sparkle" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-rose-200 to-violet-200 animate-glow" />
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
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
        @keyframes glow {
          0%, 100% { opacity: 0.3; box-shadow: 0 0 15px rgba(244, 114, 182, 0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 25px rgba(244, 114, 182, 0.6); }
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 114, 182, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(244, 114, 182, 0); }
        }
        @keyframes float-shadow {
          0%, 100% { transform: translateY(0); box-shadow: 0 10px 20px rgba(244, 114, 182, 0.2); }
          50% { transform: translateY(-10px); box-shadow: 0 20px 30px rgba(244, 114, 182, 0.3); }
        }
        .animate-float-shadow {
          animation: float-shadow 3s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 30px rgba(244, 114, 182, 0.2);
        }
      `}</style>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-8 border border-rose-200 hover:scale-105 transition-transform">
            <Flame className="h-5 w-5 text-rose-400 mr-2 animate-pulse" />
            <span className="text-sm font-medium text-rose-600">
              About MoodMap
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient">
              Our Story
            </span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20 space-y-24 relative">
        {/* Mission Section */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm border border-rose-200 card-hover">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-slate-600">
                At StressLess, we're pioneering a new approach to stress management. 
                We believe that everyone deserves access to effective, science-backed tools 
                for mental wellness. Through our innovative platform, we're making professional-grade 
                stress management techniques accessible to all, combining cutting-edge technology 
                with proven psychological methods.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/80 backdrop-blur-sm border border-rose-200 card-hover group"
            >
              <CardContent className="pt-6">
                <div className="rounded-full bg-rose-100 p-3 w-fit mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-700 group-hover:text-rose-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
            Meet Our Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-rose-200 card-hover group relative overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 animate-spin-slow opacity-75" />
                    <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                      <div className="text-rose-400 group-hover:text-rose-500 transition-colors duration-300">
                        {member.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="font-semibold text-xl mb-1 text-slate-700 group-hover:text-rose-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-rose-400 mb-2 group-hover:text-rose-500 transition-colors duration-300">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm opacity-90 group-hover:text-slate-800 transition-colors duration-300">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section>
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-rose-200 card-hover">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Have questions or feedback? We're here to help!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Name
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Your name"
                    className="bg-white/50 border-rose-200 text-slate-800 placeholder-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="bg-white/50 border-rose-200 text-slate-800 placeholder-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Your message..."
                    className="bg-white/50 border-rose-200 text-slate-800 placeholder-slate-400"
                    rows={4}
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 hover:from-rose-500 hover:via-pink-500 hover:to-violet-500 text-white rounded-full py-3 font-semibold animate-pulse-border hover:animate-none transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

