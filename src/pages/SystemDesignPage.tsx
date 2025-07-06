import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import AstroButton from '../components/AstroButton';
import { getSystemDesignResources } from '../api';

const SystemDesignPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSystemDesignResources()
      .then(data => setResources(data))
      .catch(() => setError('Failed to load resources'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>System Design Sandbox</Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Drag-and-drop whiteboard, save/share, and sample solutions coming soon.
        </Typography>
        <Box sx={{ my: 3 }}>
          <AstroButton variant="contained">Start Designing</AstroButton>
        </Box>
        <Typography variant="caption">Collaborative design and feedback features in progress.</Typography>
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">System Design Resources</Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <List>
            {resources.map((r, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemText
                  primary={r.title || r.name}
                  secondary={r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url}</a> : null}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default SystemDesignPage;
