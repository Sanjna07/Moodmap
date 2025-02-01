"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
const Header: React.FC = () => {
  const session=useSession();
  return (
    <header className="bg-gradient-to-r from-rose-50 via-pink-50 to-violet-50 shadow-lg relative">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo and App Name */}
        <Link 
          href="/" 
          className="text-2xl font-bold flex items-center space-x-2 group"
        >
          {/* SVG Logo */}
          <div className="h-8 w-8 transform group-hover:scale-110 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="url(#headerGradient)"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4v-2h-4v2zm1-4h2v-6h-2v6z" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            MoodMap
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {[
            { href: "/", label: "Home" },
            { href: "/stress-test", label: "Stress Test" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/ai-support", label: "AI Support" },
            { href: "/games", label: "Games" },
            { href: "/about", label: "About" }
          ].map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-slate-600 hover:text-rose-500 relative group transition-colors duration-300"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign-in Button */}
        <Link
          href={session.status=='authenticated'?'api/auth/signout':'/signin'}
          className="ml-6 px-6 py-2 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 hover:from-rose-500 hover:via-pink-500 hover:to-violet-500 transition-all duration-300 animate-pulse-border"
        >
          {session.status=='authenticated'?"Log Out":"Sign In"}
        </Link>
      </nav>

      {/* Add the pulse border animation */}
      <style jsx global>{`
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244, 114, 182, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(244, 114, 182, 0); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
