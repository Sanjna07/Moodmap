"use client";

import { Heart, Brain, Smile, Sparkles, ArrowRight, Moon, Star, Flame } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [floatingElements, setFloatingElements] = useState<Array<{ left: number; top: number; rotate: number }>>([]);

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
      {/* Previous background code remains the same */}
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
        /* Previous animations remain the same */
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
        /* New button and card animations */
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

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Previous header content remains the same until buttons */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-8 border border-rose-200 hover:scale-105 transition-transform">
              <Flame className="h-5 w-5 text-rose-400 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-rose-600">Transform Your Life Today</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient">
                Transform Your Mind,
              </span>
              <span className="block text-slate-700">
                Find Your Peace
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
              Discover a sanctuary of tranquility in your daily life. Our proven techniques help you manage stress, reduce anxiety, and cultivate lasting inner peace.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={()=>redirect('/dashboard')} className="group px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 hover:from-rose-500 hover:via-pink-500 hover:to-violet-500 text-white rounded-full font-semibold text-lg animate-pulse-border hover:animate-none transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-xl">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full font-semibold text-lg border border-rose-200 hover:bg-white/90 animate-float-shadow hover:animate-none transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-rose-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/40 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-700 sm:text-4xl">
              Your Path to Mental Wellness
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Discover our comprehensive approach to mental well-being, with guided exercises, expert advice, and a community that supports your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { Icon: Heart, title: "Emotional Resilience", desc: "Build strength to face life's challenges with confidence." },
              { Icon: Brain, title: "Mental Clarity", desc: "Improve focus and reduce mental clutter with proven techniques." },
              { Icon: Smile, title: "Positive Outlook", desc: "Cultivate gratitude and embrace a more optimistic perspective." },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white/80 rounded-lg backdrop-blur-sm card-hover group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <feature.Icon className="h-12 w-12 text-rose-400 mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 group-hover:text-rose-600 transition-colors duration-300">{feature.title}</h3>
                <p className="mt-2 text-slate-600 group-hover:text-slate-800 transition-colors duration-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
