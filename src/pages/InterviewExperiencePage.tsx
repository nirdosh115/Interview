import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert, MenuItem } from '@mui/material';
import axios from 'axios';

interface InterviewExperience {
  id?: number;
  company: string;
  role: string;
  experience: string;
  difficulty: string;
  createdAt?: string;
}

const InterviewExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<InterviewExperience[]>([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/interview-experience')
      .then(res => setExperiences(res.data))
      .catch(() => setError('Failed to load experiences'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!company || !role || !experience || !difficulty) {
      setError('All fields are required.');
      return;
    }
    try {
      const res = await axios.post('/api/interview-experience', { company, role, experience, difficulty });
      setExperiences([res.data, ...experiences]);
      setCompany('');
      setRole('');
      setExperience('');
      setDifficulty('');
      setSuccess('Experience submitted!');
    } catch {
      setError('Failed to submit experience.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Share Interview Experience</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Company" value={company} onChange={e => setCompany(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField label="Difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)} select fullWidth sx={{ mb: 2 }}>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </TextField>
          <TextField label="Experience" value={experience} onChange={e => setExperience(e.target.value)} fullWidth multiline rows={4} sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" fullWidth>Submit</Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">Recent Experiences</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {experiences.map(exp => (
              <ListItem key={exp.id} alignItems="flex-start">
                <ListItemText
                  primary={<><b>{exp.company}</b> - {exp.role} <small>({exp.difficulty})</small></>}
                  secondary={<>{exp.experience}<br /><small>{exp.createdAt}</small></>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default InterviewExperiencePage;
