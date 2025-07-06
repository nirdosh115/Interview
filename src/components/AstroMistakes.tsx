import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const mistakes = [
  'Forgetting to close resources (e.g., Streams, DB connections)',
  'NullPointerException due to unchecked nulls',
  'Misusing equals() and == for object comparison',
  'Ignoring thread safety in shared data',
  'Hardcoding values instead of using configs',
];

const AstroMistakes: React.FC = () => (
  <Paper elevation={2} sx={{ p: 3, background: 'rgba(80,40,120,0.85)', color: '#ffd600', border: '1px solid #ffd60055', mb: 3 }}>
    <Typography variant="h6" sx={{ color: '#ffd600', mb: 2 }}>Common Mistakes</Typography>
    <List>
      {mistakes.map((m, idx) => (
        <ListItem key={idx}>
          <ListItemIcon><ErrorOutlineIcon sx={{ color: '#ffd600' }} /></ListItemIcon>
          <Typography>{m}</Typography>
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default AstroMistakes;
