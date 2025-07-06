import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

interface CustomTag {
  id?: number;
  name: string;
}

const CustomTagsPage: React.FC = () => {
  const [tags, setTags] = useState<CustomTag[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/custom-tags')
      .then(res => setTags(res.data))
      .catch(() => setError('Failed to load tags'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name) {
      setError('Tag name cannot be empty.');
      return;
    }
    try {
      const res = await axios.post('/api/custom-tags', { name });
      setTags([res.data, ...tags]);
      setName('');
      setSuccess('Tag created!');
    } catch {
      setError('Failed to create tag.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Custom Tags</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Tag Name" value={name} onChange={e => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" fullWidth>Create Tag</Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">All Tags</Typography>
        {loading ? <CircularProgress /> : (
          <List>
            {tags.map(tag => (
              <ListItem key={tag.id} alignItems="flex-start">
                <ListItemText primary={tag.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default CustomTagsPage;
