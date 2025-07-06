import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import AstroButton from './AstroButton';
import { getQuestions } from '../api';
import type { Question } from '../api';

const AstroQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getQuestions()
      .then(data => setQuestions(data))
      .catch(() => setError('Failed to load questions'))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (idx: number) => setSelected(idx);
  const handleNext = () => {
    if (selected === questions[step]?.answerIndex) setScore(s => s + 1);
    if (step < questions.length - 1) {
      setStep(s => s + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'rgba(40,30,80,0.92)', color: '#ffd600', border: '1px solid #ffd60055' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Random Quiz</Typography>
      {loading ? (
        <Typography sx={{ color: '#ffd600', width: '100%', textAlign: 'center', mt: 4 }}>Loading questions...</Typography>
      ) : error ? (
        <Typography sx={{ color: 'red', width: '100%', textAlign: 'center', mt: 4 }}>{error}</Typography>
      ) : questions.length === 0 ? (
        <Typography sx={{ color: '#ffd600', width: '100%', textAlign: 'center', mt: 4 }}>No questions found.</Typography>
      ) : (
        <>
          <LinearProgress variant="determinate" value={((step + 1) / questions.length) * 100} sx={{ mb: 2, height: 8, borderRadius: 4 }} />
          {!showResult ? (
            <>
              <Typography sx={{ mb: 2 }}>{questions[step].title}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {questions[step].options?.map((opt: string, idx: number) => (
                  <AstroButton
                    key={opt}
                    variant={selected === idx ? 'contained' : 'outlined'}
                    onClick={() => handleSelect(idx)}
                    glow={selected === idx}
                    sx={{ color: '#ffd600', borderColor: '#ffd600', background: selected === idx ? '#ffd60033' : 'transparent' }}
                  >
                    {opt}
                  </AstroButton>
                ))}
              </Box>
              <AstroButton variant="contained" onClick={handleNext} sx={{ mt: 2 }} disabled={selected === null}>
                {step === questions.length - 1 ? 'Finish' : 'Next'}
              </AstroButton>
            </>
          ) : (
            <Typography variant="h5" sx={{ mt: 2 }}>Score: {score} / {questions.length}</Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default AstroQuiz;
