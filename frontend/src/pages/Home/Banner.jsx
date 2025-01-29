import React, { useState } from "react";
import "../../App.css";
import booksImage from "../../assets/img1.png";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import { BookOpen, ArrowRight, Library } from "lucide-react";

const Banner = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="relative">
        {/* Top shapes */}
        <div
          className="absolute top-0 left-1/4 w-48 h-48 bg-sky-50 rounded-full 
                     mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <div
          className="absolute top-0 right-1/4 w-48 h-48 bg-amber-50 rounded-full 
                     mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />

        <div className="flex flex-col py-16 md:py-24 justify-center items-center gap-10 md:gap-16">
          {/* Search Bar Section */}
          <div className="w-full max-w-2xl px-4 relative z-10">
            <div className="p-1 bg-white rounded-xl shadow-[0_0_30px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <Search />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 gap-16">
            {/* Text Content */}
            <div className="md:w-1/2 w-full flex flex-col justify-center items-start space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-amber-700 text-sm mb-4">
                    <Library className="w-4 h-4" />
                    <span>Digital Library</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                  Your Gateway to
                  <span className="block mt-1 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    Endless Stories
                  </span>
                </h1>

                <p className="text-lg text-gray-600 max-w-lg">
                  Discover stories that inspire, entertain, and transform. Your
                  next literary adventure is just a click away.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/books">
                  <button
                    className="group inline-flex items-center gap-2 px-6 py-3 
                                   bg-gray-900 hover:bg-gray-800 text-white rounded-lg
                                   transition-all duration-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Browse Collection</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <p className="text-sm text-gray-500">
                  Join{" "}
                  <span className="font-semibold text-sky-600">2,000+</span>{" "}
                  readers
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 w-full">
              <div className="relative">
                {/* Image loading state */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-sky-600 animate-spin" />
                  </div>
                )}

                {/* Main image with container */}
                <div className="relative bg-gradient-to-tr from-sky-50 to-amber-50 rounded-2xl p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.15)]">
                  <img
                    src={booksImage}
                    alt="Digital Book Collection"
                    className={`w-full max-w-lg h-auto mx-auto object-cover rounded-xl
                               transition-all duration-700 transform hover:scale-[1.02]
                               ${
                                 isImageLoaded
                                   ? "opacity-100 translate-y-0"
                                   : "opacity-0 translate-y-4"
                               }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />

                  {/* Stats card */}
                  <div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2
                                bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm
                                flex items-center gap-6 border border-gray-100"
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">1000+</p>
                      <p className="text-sm text-gray-600">Books</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">24/7</p>
                      <p className="text-sm text-gray-600">Access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these keyframes to your CSS */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Banner;
