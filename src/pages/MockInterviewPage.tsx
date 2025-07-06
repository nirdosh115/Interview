import React, { useState } from 'react';
import { Container, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import AstroButton from '../components/AstroButton';
import { startMockInterview, analyzeAI } from '../api';

const MockInterviewPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    setSession(null);
    setFeedback(null);
    setAnswer('');
    try {
      const data = await startMockInterview();
      setSession(data);
      setTimer(600); // 10 min
      const id = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
      setIntervalId(id);
    } catch (e: any) {
      setError(e?.message || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await analyzeAI(answer);
      setFeedback(res.feedback || res.result || 'No feedback');
    } catch (e: any) {
      setFeedback('AI feedback failed');
    } finally {
      setLoading(false);
      if (intervalId) clearInterval(intervalId);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Mock Interview</Typography>
        {!session ? (
          <>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Simulate a real interview with timed rounds and AI feedback.
            </Typography>
            <Box sx={{ my: 3 }}>
              <AstroButton variant="contained" size="large" onClick={handleStart} disabled={loading}>Start Mock Interview</AstroButton>
            </Box>
            {loading && <CircularProgress />}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Typography variant="caption">Video/Audio simulation and peer-to-peer scheduling coming soon.</Typography>
          </>
        ) : (
          <>
            <Typography variant="h6">{session.question || 'No question'}</Typography>
            <Typography variant="body2" color="text.secondary">Time left: {Math.floor(timer/60)}:{(timer%60).toString().padStart(2,'0')}</Typography>
            <Box sx={{ my: 2 }}>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={6}
                style={{ width: '100%', fontSize: 16, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                placeholder="Type your answer here..."
                disabled={loading || timer === 0}
              />
            </Box>
            <AstroButton variant="contained" onClick={handleSubmit} disabled={loading || timer === 0}>Submit Answer</AstroButton>
            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {feedback && <Alert severity="info" sx={{ mt: 2 }}>{feedback}</Alert>}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default MockInterviewPage;
