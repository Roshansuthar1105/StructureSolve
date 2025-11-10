import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ${
        isDark ? "bg-dark-primary" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div
                className={`w-8 h-8 rounded-lg ${
                  isDark ? "bg-dark-secondary" : "bg-light-primary"
                } flex items-center justify-center mr-3`}
              >
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Structure Solver
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/topics"
              className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
            >
              Topics
            </Link>
            <Link
              to="/sheets"
              className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
            >
              Practice Sheets
            </Link>
            <Link
              to="/roadmaps"
              className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
            >
              Roadmaps
            </Link>

            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-light-primary dark:bg-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-accent text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                to="/topics"
                className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Topics
              </Link>
              <Link
                to="/sheets"
                className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice Sheets
              </Link>
              <Link
                to="/roadmaps"
                className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmaps
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:text-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-light-primary dark:text-dark-secondary hover:text-light-secondary dark:hover:text-dark-accent transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
