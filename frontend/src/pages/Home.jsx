import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master Data Structures & Algorithms
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one platform to learn, practice, and master DSA. From beginner to interview-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className={`inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-dark-secondary hover:bg-dark-accent shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                    : 'bg-light-primary hover:bg-light-secondary shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                Start Learning Free
              </Link>
              <Link
                to="/topics"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-light-primary dark:hover:border-dark-secondary transition-all duration-300"
              >
                Explore Topics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive DSA learning platform with interactive features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed articles, visualizations, and examples for every major DSA topic with curated practice problems.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-secondary' : 'bg-light-primary'} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Practice Environment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built-in code editor with multiple language support. Run and test your code instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-accent' : 'bg-light-secondary'} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress with streaks, heatmaps, and detailed analytics. Stay motivated with gamification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Master DSA?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of developers who have transformed their coding skills with Structure Solver.
          </p>
          <Link
            to="/register"
            className={`inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
              isDark 
                ? 'bg-dark-secondary hover:bg-dark-accent shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                : 'bg-light-primary hover:bg-light-secondary shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;