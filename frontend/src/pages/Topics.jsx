import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { topicsAPI } from '../utils/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { isDark } = useTheme();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const data = await topicsAPI.getAll();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTopics = topics.filter(topic => 
    filter === 'all' || topic.difficulty === filter
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTopicIcon = (topicName) => {
    const icons = {
      'Arrays': '📊',
      'Linked Lists': '🔗',
      'Stacks': '📚',
      'Queues': '🎯',
      'Trees': '🌳',
      'Graphs': '🕸️',
      'Sorting': '🔀',
      'Searching': '🔍',
      'Dynamic Programming': '💡',
      'Recursion': '🔄'
    };
    return icons[topicName] || '📖';
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
          Data Structures & Algorithms Topics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Master fundamental to advanced DSA concepts with comprehensive learning materials
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            filter === 'all'
              ? 'bg-light-primary dark:bg-dark-secondary text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Topics
        </button>
        <button
          onClick={() => setFilter('beginner')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            filter === 'beginner'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => setFilter('intermediate')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            filter === 'intermediate'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Intermediate
        </button>
        <button
          onClick={() => setFilter('advanced')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            filter === 'advanced'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Link
            key={topic._id}
            to={`/topics/${topic._id}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-light-primary dark:hover:border-dark-secondary group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{getTopicIcon(topic.name)}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-light-primary dark:group-hover:text-dark-secondary transition-colors duration-200">
                {topic.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {topic.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{topic.problemIds?.length || 0} problems</span>
                <div className="flex items-center">
                  <span>Start Learning</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No topics found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Topics;