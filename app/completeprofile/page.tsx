"use client";

import { useState } from 'react';
import { ArrowRight, User, Phone, Calendar, Heart } from 'lucide-react';

export default function CompleteProfile() {
  const [interests, setInterests] = useState<string[]>([]);
  const [floatingElements] = useState(
    Array(8).fill(null).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );

  const commonInterests = [
    "Meditation", "Yoga", "Reading", "Exercise",
    "Music", "Art", "Nature", "Travel",
    "Cooking", "Photography", "Writing", "Sports"
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden text-white py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 1.5}s`,
              opacity: 0.15
            }}
          >
            <div className={`rounded-full ${i % 2 === 0 ? 'bg-purple-400 h-16 w-16' : 'bg-indigo-400 h-12 w-12'}`} />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 relative">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-300">Tell us more about yourself to personalize your experience</p>
          </div>

          {/* Profile Form */}
          <form className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your age"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                  <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                What interests you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {commonInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
                      ${interests.includes(interest)
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800/70'
                      } border`}
                  >
                    <Heart className={`h-4 w-4 ${interests.includes(interest) ? 'text-purple-300' : 'text-gray-400'}`} />
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg py-3 font-semibold shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-1 flex items-center justify-center"
            >
              Complete Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
