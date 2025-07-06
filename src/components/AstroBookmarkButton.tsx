import React from 'react';

interface AstroBookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
  className?: string;
}

export const AstroBookmarkButton: React.FC<AstroBookmarkButtonProps> = ({
  isBookmarked,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-full transition-colors duration-200 ease-in-out
        ${isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-gray-500'
        }
        ${className}
      `}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
};
