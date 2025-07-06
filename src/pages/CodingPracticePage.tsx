import React, { useEffect, useState } from 'react';
import { AstroQA } from '../components/AstroQA';
import { AstroSearchBar } from '../components/AstroSearchBar';
import { AstroRadio } from '../components/AstroRadio';

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

const CodingPracticePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [searchTerm, selectedDifficulty, selectedTopic, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const filterQuestions = () => {
    let filtered = [...questions];

    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty.toUpperCase());
    }

    if (selectedTopic !== 'all') {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }

    setFilteredQuestions(filtered);
  };

  const handleBookmark = async (questionId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/questions/${questionId}/bookmark`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(questions.map(q =>
          q.id === questionId ? updatedQuestion : q
        ));
      }
    } catch (error) {
      console.error('Error bookmarking question:', error);
    }
  };

  const handleMistake = async (questionId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/questions/${questionId}/mistake`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(questions.map(q =>
          q.id === questionId ? updatedQuestion : q
        ));
      }
    } catch (error) {
      console.error('Error logging mistake:', error);
    }
  };

  const handleReview = async (questionId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/questions/${questionId}/review`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(questions.map(q =>
          q.id === questionId ? updatedQuestion : q
        ));
      }
    } catch (error) {
      console.error('Error marking review:', error);
    }
  };

  const topics = Array.from(new Set(questions.map(q => q.topic)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coding Practice</h1>

      <div className="mb-8">
        <AstroSearchBar
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
          placeholder="Search questions..."
          className="mb-4"
        />

        <div className="flex space-x-8 mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
            <AstroRadio
              options={[
                { label: 'All', value: 'all' },
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ]}
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Topic</h3>
            <AstroRadio
              options={[
                { label: 'All', value: 'all' },
                ...topics.map(topic => ({
                  label: topic,
                  value: topic.toLowerCase(),
                })),
              ]}
              value={selectedTopic}
              onChange={setSelectedTopic}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredQuestions.map(question => (
          <AstroQA
            key={question.id}
            question={question}
            onBookmark={handleBookmark}
            onMistake={handleMistake}
            onReview={handleReview}
          />
        ))}
      </div>
    </div>
  );
};

export default CodingPracticePage;
