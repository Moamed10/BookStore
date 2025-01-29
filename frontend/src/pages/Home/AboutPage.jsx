import React from "react";
import { Book, Globe, ShoppingCart, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Endless Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your gateway to a world of knowledge, creativity, and endless
            stories. Buy, sell, and explore digital books from the comfort of
            your device.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <Book className="text-purple-600 w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Vast Library
                </h3>
                <p className="text-gray-600">
                  Access thousands of books across multiple genres and
                  categories.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <ShoppingCart className="text-blue-600 w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Buy & Sell</h3>
                <p className="text-gray-600">
                  Monetize your writing or discover new reads from independent
                  authors.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <Globe className="text-green-600 w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Global Access
                </h3>
                <p className="text-gray-600">
                  Read from anywhere, anytime. Your library is always with you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                Endless Library bridges the gap between authors and readers. We
                provide a seamless platform where creativity meets opportunity.
              </p>
              <p className="text-gray-600">
                Whether you're an aspiring writer looking to share your work or
                a passionate reader seeking new adventures, our platform
                empowers you to connect, learn, and grow.
              </p>
            </div>
            <div className="bg-indigo-600 text-white p-6 flex items-center space-x-4">
              <Users className="w-10 h-10" />
              <div>
                <h4 className="font-bold text-xl">Community Driven</h4>
                <p>Built by readers, for readers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
