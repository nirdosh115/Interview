import type { ButtonProps } from '@mui/material';
import React from 'react';
import { Button } from '@mui/material';

const AstroButton: React.FC<ButtonProps & { glow?: boolean }> = ({ glow = true, sx, ...props }) => (
  <Button
    {...props}
    sx={{
      background: 'linear-gradient(90deg, #2c2250 0%, #5e3b8c 100%)',
      color: '#ffd600',
      border: '1.5px solid #ffd600',
      boxShadow: glow ? '0 0 12px #ffd60088' : undefined,
      borderRadius: 12,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: 'none',
      transition: 'all 0.2s',
      '&:hover': {
        background: 'linear-gradient(90deg, #5e3b8c 0%, #2c2250 100%)',
        color: '#fff',
        boxShadow: '0 0 24px #ffd600cc',
      },
      ...sx,
    }}
  />
);

export default AstroButton;
