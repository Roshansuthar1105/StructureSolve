import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { topicsAPI, problemsAPI } from '../utils/api';

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchTopicDetail();
  }, [id]);

  const fetchTopicDetail = async () => {
    try {
      const [topicData, problemsData] = await Promise.all([
        topicsAPI.getById(id),
        problemsAPI.getAll()
      ]);
      
      setTopic(topicData);
      // Filter problems for this topic
      const topicProblems = problemsData.filter(problem => 
        topicData.problemIds?.includes(problem._id)
      );
      setProblems(topicProblems);
    } catch (error) {
      console.error('Error fetching topic detail:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-secondary"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Topic Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The topic you're looking for doesn't exist.</p>
          <Link
            to="/topics"
            className={`inline-flex items-center px-4 py-2 rounded-lg text-white ${
              isDark ? 'bg-dark-secondary hover:bg-dark-accent' : 'bg-light-primary hover:bg-light-secondary'
            } transition-colors duration-200`}
          >
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/topics"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-secondary transition-colors duration-200 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Topics
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {topic.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {topic.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
            {topic.difficulty}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About This Topic</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {topic.content || `Learn everything about ${topic.name} with comprehensive explanations, examples, and practice problems. This topic covers fundamental concepts that are essential for mastering data structures and algorithms.`}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Key Concepts</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Basic operations and properties</li>
                <li>Time and space complexity analysis</li>
                <li>Common patterns and techniques</li>
                <li>Real-world applications</li>
                <li>Interview preparation tips</li>
              </ul>
            </div>
          </div>

          {/* Practice Problems */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Practice Problems ({problems.length})
            </h2>
            
            {problems.length > 0 ? (
              <div className="space-y-3">
                {problems.map((problem, index) => (
                  <div
                    key={problem._id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-light-primary dark:hover:border-dark-secondary transition-colors duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 group-hover:bg-light-primary dark:group-hover:bg-dark-secondary transition-colors duration-200">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-secondary transition-colors duration-200">
                          {problem.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {problem.description?.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200 ${
                          isDark 
                            ? 'bg-dark-secondary hover:bg-dark-accent' 
                            : 'bg-light-primary hover:bg-light-secondary'
                        }`}
                      >
                        Solve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No problems available</h3>
                <p className="text-gray-500 dark:text-gray-400">Practice problems will be added soon for this topic</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Problems Solved</span>
                  <span>0/{problems.length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
              <button
                className={`w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                  isDark 
                    ? 'bg-dark-secondary hover:bg-dark-accent' 
                    : 'bg-light-primary hover:bg-light-secondary'
                }`}
              >
                Start Learning
              </button>
            </div>
          </div>

          {/* Resources Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm">📚</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-light-primary dark:group-hover:text-dark-secondary">
                  Study Guide
                </span>
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">🎥</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-light-primary dark:group-hover:text-dark-secondary">
                  Video Tutorials
                </span>
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-sm">💡</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-light-primary dark:group-hover:text-dark-secondary">
                  Tips & Tricks
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;