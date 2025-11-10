import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Roadmaps = () => {
  const { isDark } = useTheme();

  const roadmaps = [
    {
      id: 1,
      title: "Beginner's Path",
      description: "Start your DSA journey with fundamental concepts and basic problem-solving techniques",
      duration: "8 weeks",
      level: "Beginner",
      topics: ["Arrays", "Strings", "Basic Sorting", "Simple Recursion"],
      color: "green"
    },
    {
      id: 2,
      title: "Interview Preparation",
      description: "Comprehensive path covering all essential topics for technical interviews",
      duration: "12 weeks",
      level: "Intermediate",
      topics: ["Trees", "Graphs", "Dynamic Programming", "System Design Basics"],
      color: "blue"
    },
    {
      id: 3,
      title: "Advanced Algorithms",
      description: "Master complex algorithms and competitive programming techniques",
      duration: "16 weeks",
      level: "Advanced",
      topics: ["Advanced DP", "Graph Algorithms", "Number Theory", "Segment Trees"],
      color: "purple"
    },
    {
      id: 4,
      title: "Frontend Focused",
      description: "DSA concepts most relevant for frontend development interviews",
      duration: "6 weeks",
      level: "Intermediate",
      topics: ["Arrays", "Strings", "Object Manipulation", "DOM Tree Problems"],
      color: "yellow"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green: isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800',
      blue: isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-800',
      purple: isDark ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-800',
      yellow: isDark ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBorderColor = (color) => {
    const colorMap = {
      green: 'border-green-200 dark:border-green-800',
      blue: 'border-blue-200 dark:border-blue-800',
      purple: 'border-purple-200 dark:border-purple-800',
      yellow: 'border-yellow-200 dark:border-yellow-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Learning Roadmaps
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Structured learning paths to guide your DSA journey from beginner to expert
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${getBorderColor(roadmap.color)} hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-secondary transition-colors duration-200">
                  {roadmap.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(roadmap.color)}`}>
                  {roadmap.level}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {roadmap.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{roadmap.duration}</span>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {roadmap.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/roadmaps/${roadmap.id}`}
                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-300 ${
                  isDark 
                    ? 'bg-dark-secondary hover:bg-dark-accent' 
                    : 'bg-light-primary hover:bg-light-secondary'
                } group-hover:transform group-hover:-translate-y-0.5`}
              >
                Start This Path
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Help Choosing?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} flex items-center justify-center mx-auto mb-3`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Assess Your Level</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Take our skill assessment test to find the perfect starting point
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-secondary' : 'bg-light-primary'} flex items-center justify-center mx-auto mb-3`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Join our community to get help and guidance from fellow learners
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-dark-accent' : 'bg-light-secondary'} flex items-center justify-center mx-auto mb-3`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Monitor your advancement with detailed progress tracking and analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;