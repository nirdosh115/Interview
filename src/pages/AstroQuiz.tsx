import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Button, Chip, CircularProgress, Alert } from '@mui/material';
import { getQuestions } from '../api';

const AstroQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
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

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected !== null && questions[current].options[selected] === questions[current].answer) {
      setScore(s => s + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 8, mx: 'auto', display: 'block' }} />;
  if (error) return <Alert severity="error" sx={{ mt: 8 }}>{error}</Alert>;
  if (showResult) return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">Quiz Complete!</Typography>
        <Typography variant="h6">Score: {score} / {questions.length}</Typography>
        <Button variant="contained" onClick={() => { setCurrent(0); setScore(0); setShowResult(false); }}>Retry</Button>
      </Paper>
    </Container>
  );

  const q = questions[current];

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6">Question {current + 1} of {questions.length}</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>{q.text}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {q.options.map((opt: string, idx: number) => (
            <Chip
              key={idx}
              label={opt}
              color={selected === idx ? 'primary' : 'default'}
              onClick={() => handleSelect(idx)}
              sx={{ fontSize: 16, p: 2, cursor: 'pointer' }}
            />
          ))}
        </Box>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleNext} disabled={selected === null}>Next</Button>
      </Paper>
    </Container>
  );
};

export default AstroQuiz;
