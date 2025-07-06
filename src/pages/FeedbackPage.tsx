import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Rating, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

interface Feedback {
  id?: number;
  username: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/feedback')
      .then(res => setFeedbacks(res.data))
      .catch(() => setError('Failed to load feedback'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!username || !rating || !comment) {
      setError('All fields are required.');
      return;
    }
    try {
      const res = await axios.post('/api/feedback', { username, rating, comment });
      setFeedbacks([res.data, ...feedbacks]);
      setUsername('');
      setRating(null);
      setComment('');
      setSuccess('Feedback submitted!');
    } catch {
      setError('Failed to submit feedback.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Feedback & Ratings</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Your Name" value={username} onChange={e => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating value={rating} onChange={(_, v) => setRating(v)} />
          </Box>
          <TextField label="Comment" value={comment} onChange={e => setComment(e.target.value)} fullWidth multiline rows={3} sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" fullWidth>Submit</Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">Recent Feedback</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {feedbacks.map(fb => (
              <ListItem key={fb.id} alignItems="flex-start">
                <ListItemText
                  primary={<><b>{fb.username}</b> <Rating value={fb.rating} readOnly size="small" /></>}
                  secondary={<>{fb.comment}<br /><small>{fb.createdAt}</small></>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
