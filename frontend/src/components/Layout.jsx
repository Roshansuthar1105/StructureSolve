import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-lg bg-light-primary dark:bg-dark-secondary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">SS</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Structure Solver
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; 2024 Structure Solver. Built with the MERN stack.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;