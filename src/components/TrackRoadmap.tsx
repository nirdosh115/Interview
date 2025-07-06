import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Paper, Button } from '@mui/material';

const steps = [
  'Core Java & OOP',
  'Collections & Streams',
  'Concurrency',
  'Spring Boot',
  'Microservices',
  'System Design',
  'DevOps',
  'Leadership',
];

const TrackRoadmap: React.FC<{ progress: number }> = ({ progress }) => (
  <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
    <Typography variant="h5" fontWeight={700} gutterBottom>Track Roadmap</Typography>
    <Stepper activeStep={progress} alternativeLabel>
      {steps.map((label, idx) => (
        <Step key={label} completed={progress > idx}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Button variant="contained">View Checklist</Button>
    </Box>
  </Paper>
);

export default TrackRoadmap;
