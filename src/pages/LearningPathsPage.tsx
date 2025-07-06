import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { School, Search, FilterList } from '@mui/icons-material';
import LearningPathCard from '../components/LearningPath/LearningPathCard';
import axios from 'axios';

interface LearningPath {
  id: number;
  title: string;
  description: string;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  topicCount: number;
  progress?: number;
}

const LearningPathsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('');

  const { data: learningPaths, isLoading, error } = useQuery<LearningPath[]>({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      const response = await axios.get('/api/learning-paths');
      return response.data;
    },
  });

  const filteredPaths = React.useMemo(() => {
    if (!learningPaths) return [];
    
    return learningPaths.filter(path => {
      const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          path.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = !selectedDifficulty || path.difficultyLevel === selectedDifficulty;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [learningPaths, searchQuery, selectedDifficulty]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl">Error loading learning paths</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <School className="text-primary-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
        </div>
        <p className="text-gray-600">
          Choose your learning path and start mastering Java today
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search learning paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <div className="relative">
            <FilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid */}
      {filteredPaths.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No learning paths found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <LearningPathCard
              key={path.id}
              {...path}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathsPage; 