import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@mui/material';

const checklist = [
  'Understand OOP principles',
  'Master Java Collections',
  'Practice concurrency problems',
  'Build a Spring Boot REST API',
  'Learn microservices basics',
  'Design a scalable system',
  'Get familiar with Docker & CI/CD',
  'Prepare for leadership questions',
];

const TrackChecklist: React.FC<{ checked: boolean[]; onToggle: (idx: number) => void }> = ({ checked, onToggle }) => (
  <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
    <Typography variant="h6" gutterBottom>Checklist</Typography>
    <List>
      {checklist.map((item, idx) => (
        <ListItem key={item} onClick={() => onToggle(idx)}>
          <ListItemIcon>
            <Checkbox edge="start" checked={checked[idx]} tabIndex={-1} disableRipple />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default TrackChecklist;
