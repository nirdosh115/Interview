import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const AstroProgressMeter: React.FC<{ value: number; label?: string }> = ({ value, label }) => (
  <Box sx={{ textAlign: 'center', my: 2 }}>
    <Typography variant="subtitle1" sx={{ color: '#ffd600', mb: 1 }}>{label || 'Readiness Meter'}</Typography>
    <Box sx={{ position: 'relative', display: 'inline-flex', width: 220 }}>
      <LinearProgress variant="determinate" value={value} sx={{ height: 16, borderRadius: 8, background: '#2c2250', boxShadow: '0 0 16px #ffd60088' }} />
      <Typography
        variant="caption"
        component="div"
        color="#ffd600"
        sx={{ position: 'absolute', left: '50%', top: 2, transform: 'translateX(-50%)', fontWeight: 700 }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

export default AstroProgressMeter;
