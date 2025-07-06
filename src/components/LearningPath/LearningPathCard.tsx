import React from 'react';
import { Link } from 'react-router-dom';
import { School, Timer, ArrowForward } from '@mui/icons-material';

interface LearningPathCardProps {
  id: number;
  title: string;
  description: string;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  progress?: number;
  topicCount: number;
}

const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors = {
    BEGINNER: 'bg-green-100 text-green-800',
    INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
    ADVANCED: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[level]}`}>
      {level.charAt(0) + level.slice(1).toLowerCase()}
    </span>
  );
};

const LearningPathCard: React.FC<LearningPathCardProps> = ({
  id,
  title,
  description,
  difficultyLevel,
  estimatedHours,
  progress = 0,
  topicCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <DifficultyBadge level={difficultyLevel} />
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1" />
            <span>{estimatedHours} hours</span>
          </div>
          <div className="flex items-center">
            <School className="w-4 h-4 mr-1" />
            <span>{topicCount} topics</span>
          </div>
        </div>

        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900 font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Link
          to={`/learning-paths/${id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          Start Learning
          <ArrowForward className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default LearningPathCard; 