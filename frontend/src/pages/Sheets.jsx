import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { sheetsAPI } from '../utils/api';

const Sheets = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      const data = await sheetsAPI.getAll();
      setSheets(data);
    } catch (error) {
      console.error('Error fetching sheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getSheetIcon = (sheetName) => {
    if (sheetName.includes('Beginner')) return '🚀';
    if (sheetName.includes('Interview')) return '💼';
    if (sheetName.includes('Advanced')) return '🔥';
    if (sheetName.includes('Amazon') || sheetName.includes('Google') || sheetName.includes('Microsoft')) return '🏢';
    return '📋';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-secondary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Practice Sheets
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Curated problem sets from various platforms to help you master DSA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets.map((sheet) => (
          <Link
            key={sheet._id}
            to={`/sheets/${sheet._id}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-light-primary dark:hover:border-dark-secondary group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{getSheetIcon(sheet.name)}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sheet.difficultyLevel)}`}>
                  {sheet.difficultyLevel}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-light-primary dark:group-hover:text-dark-secondary transition-colors duration-200">
                {sheet.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {sheet.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{sheet.problems?.length || 0} problems</span>
                <div className="flex items-center">
                  <span>Start Practicing</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sheets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No practice sheets available</h3>
          <p className="text-gray-500 dark:text-gray-400">Practice sheets will be added soon</p>
        </div>
      )}
    </div>
  );
};

export default Sheets;