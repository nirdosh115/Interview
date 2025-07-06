import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert, MenuItem } from '@mui/material';
import axios from 'axios';

interface UserNote {
  id?: number;
  questionId?: number;
  topicId?: number;
  note: string;
  createdAt?: string;
}

const UserNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [note, setNote] = useState('');
  const [questionId, setQuestionId] = useState<number | ''>('');
  const [topicId, setTopicId] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/user-notes')
      .then(res => setNotes(res.data))
      .catch(() => setError('Failed to load notes'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!note) {
      setError('Note cannot be empty.');
      return;
    }
    try {
      const res = await axios.post('/api/user-notes', { note, questionId: questionId || null, topicId: topicId || null });
      setNotes([res.data, ...notes]);
      setNote('');
      setQuestionId('');
      setTopicId('');
      setSuccess('Note saved!');
    } catch {
      setError('Failed to save note.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>My Notes</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Note" value={note} onChange={e => setNote(e.target.value)} fullWidth multiline rows={3} sx={{ mb: 2 }} />
          <TextField label="Question ID (optional)" value={questionId} onChange={e => setQuestionId(Number(e.target.value) || '')} fullWidth sx={{ mb: 2 }} />
          <TextField label="Topic ID (optional)" value={topicId} onChange={e => setTopicId(Number(e.target.value) || '')} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" fullWidth>Save Note</Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">Recent Notes</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {notes.map(n => (
              <ListItem key={n.id} alignItems="flex-start">
                <ListItemText
                  primary={n.note}
                  secondary={<>{n.questionId && `QID: ${n.questionId} `}{n.topicId && `TID: ${n.topicId}`}<br /><small>{n.createdAt}</small></>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default UserNotesPage;
