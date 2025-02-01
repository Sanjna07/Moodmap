"use client";
import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Moon, Star, Sparkles } from 'lucide-react';
import axios from 'axios'
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
const AuthPages = () => {
  const session=useSession();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [floatingElements, setFloatingElements] = useState(
    Array(8).fill(null).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );

  const toggleAuthMode = () => setIsSignIn(!isSignIn);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (isSignIn) {
      try {
        const response=axios.post('/api/signin',{email,password}).then((res)=>{
          if(res.data.status!=403){signIn("credentials",{
          email,
          name,
          password,
          redirect:true, }).then((res)=>{console.log(res)})
          }

          //USE TOAST HERE TO NOTIFY THAT LOGIN FAILED
        }) .catch((err)=>{console.log(err)})
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    } else {
      // Handle sign up logic
      try {
        // Example registration logic
        const response = axios.post('/api/signup',{name,email,password}).then((res)=>{
          console.log(res);
signIn("credentials",{
          email,
          name,
          password,
          redirect:true, }).then((res)=>{console.log(res)})

        }) .catch((err)=>{console.log(err)})
      } catch (error) {
        console.error('Sign up failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden flex items-center justify-center px-4">

    {session.status=="unauthenticated"?"":redirect('/')}
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-floating"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              opacity: 0.12
            }}
          >
            {i % 3 === 0 ? (
              <Moon className="h-16 w-16 text-rose-300 animate-pulse drop-shadow-lg" />
            ) : i % 3 === 1 ? (
              <Star className="h-12 w-12 text-violet-300 animate-twinkle drop-shadow-lg" />
            ) : (
              <Sparkles className="h-10 w-10 text-pink-300 animate-sparkle drop-shadow-lg" />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floating {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(20px, -20px) rotate(5deg) scale(1.05); }
          50% { transform: translate(-15px, 25px) rotate(-5deg) scale(0.95); }
          75% { transform: translate(-20px, -15px) rotate(3deg) scale(1.02); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); filter: blur(0px); }
          50% { opacity: 0.9; transform: scale(1.3) rotate(180deg); filter: blur(1px); }
        }
      `}</style>

      {/* Enhanced Auth Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_10px_50px_-12px_rgba(249,168,212,0.25)] border border-rose-200 hover:shadow-[0_20px_70px_-12px_rgba(249,168,212,0.35)] transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-transparent bg-clip-text mb-2 drop-shadow-sm">
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-600">
            {isSignIn ? 'Sign in to continue your journey' : 'Begin your transformation today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-400 transition-transform group-hover:scale-110 duration-300" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/50 border border-rose-200 rounded-lg py-3 px-4 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-400 transition-transform group-hover:scale-110 duration-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 border border-rose-200 rounded-lg py-3 px-4 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-400 transition-transform group-hover:scale-110 duration-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border border-rose-200 rounded-lg py-3 px-4 pl-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 hover:from-rose-500 hover:via-pink-500 hover:to-violet-500 text-white rounded-lg py-3 font-semibold shadow-lg hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center group"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-slate-500 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={()=>signIn("google")}
            className="w-full bg-white/50 text-slate-700 rounded-lg py-3 font-semibold border border-rose-200 hover:bg-white/70 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:shadow-sm"
          >
            <span className="text-lg font-bold text-red-500">G</span>
            Sign {isSignIn ? 'in' : 'up'} with Google
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleAuthMode}
            className="ml-2 text-rose-500 hover:text-rose-600 font-medium transition-colors duration-300 hover:underline decoration-rose-300 decoration-2 underline-offset-4"
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPages;
