import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const tips = [
  'Use action verbs and quantify achievements',
  'Highlight microservices and cloud experience',
  'STAR method for behavioral questions',
  'Tailor resume for each company',
  'Practice "Tell me about yourself" and communication skills',
];

const ResumeSoftSkillsPage: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Resume & Soft Skills</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Resume Tips</Typography>
      <List>
        {tips.map((tip, idx) => (
          <ListItem key={idx}><ListItemText primary={tip} /></ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 4 }}>Behavioral Interview Prep</Typography>
      <Typography variant="body2">STAR method, communication, and presentation tips included.</Typography>
    </Paper>
  </Container>
);

export default ResumeSoftSkillsPage;
