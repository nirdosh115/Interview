import React, { useState } from 'react';
import { AstroButton } from './AstroButton';
import { AstroBookmarkButton } from './AstroBookmarkButton';

interface Question {
  id: number;
  title: string;
  description: string;
  solution: string;
  topic: string;
  difficulty: string;
  mistakeCount: number;
  bookmarked: boolean;
}

interface AstroQAProps {
  question: Question;
  onBookmark?: (questionId: number) => void;
  onMistake?: (questionId: number) => void;
  onReview?: (questionId: number) => void;
}

export const AstroQA: React.FC<AstroQAProps> = ({
  question,
  onBookmark,
  onMistake,
  onReview,
}) => {
  const [showSolution, setShowSolution] = useState(false);

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(question.id);
    }
  };

  const handleMistake = () => {
    if (onMistake) {
      onMistake(question.id);
    }
  };

  const handleReview = () => {
    if (onReview) {
      onReview(question.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{question.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-sm ${
            question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
          <AstroBookmarkButton
            isBookmarked={question.bookmarked}
            onClick={handleBookmark}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">{question.description}</p>
      </div>

      <div className="mb-4">
        <AstroButton
          onClick={() => setShowSolution(!showSolution)}
          variant="secondary"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </AstroButton>
      </div>

      {showSolution && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-gray-700">{question.solution}</pre>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Topic: {question.topic}</span>
          {question.mistakeCount > 0 && (
            <span className="text-sm text-red-500">
              Mistakes: {question.mistakeCount}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <AstroButton
            onClick={handleMistake}
            variant="danger"
            size="sm"
          >
            Mark as Mistake
          </AstroButton>
          <AstroButton
            onClick={handleReview}
            variant="primary"
            size="sm"
          >
            Mark as Reviewed
          </AstroButton>
        </div>
      </div>
    </div>
  );
};
