"use client";
import Link from 'next/link';
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-50 via-pink-50 to-violet-50 text-slate-600 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="group">
            <div className="flex items-center space-x-4 mb-4">
              {/* Logo */}
              <div className="h-8 w-8 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="url(#gradient)"
                  className="h-8 w-8 transform group-hover:scale-110 transition-transform duration-300"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4v-2h-4v2zm1-4h2v-6h-2v6z" />
                </svg>
              </div>
              {/* Brand name with gradient */}
              <span className="text-xl font-semibold bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                MoodMap
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering individuals to explore emotional wellness through mindfulness and personalized insights.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Resources', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={'/'}
                    className="text-slate-600 hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Connect</h3>
            <ul className="space-y-3">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                <li key={platform}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    {platform}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-4 w-4 text-rose-400 animate-pulse" />
            <span className="text-sm text-slate-500">Made with love for better mental health</span>
          </div>
          <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
            <p>&copy; 2024 MoodMap. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
