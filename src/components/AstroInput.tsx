import React from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

const AstroInput: React.FC<TextFieldProps> = (props) => (
  <TextField
    {...props}
    variant={props.variant || 'outlined'}
    InputProps={{
      style: {
        color: '#ffd600',
        background: 'rgba(44,34,80,0.85)',
        borderRadius: 10,
        border: '1.5px solid #ffd600',
        boxShadow: '0 0 8px #ffd60044',
      },
      ...props.InputProps,
    }}
    InputLabelProps={{
      style: { color: '#ffd600' },
      ...props.InputLabelProps,
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ffd600',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ffd600',
          boxShadow: '0 0 12px #ffd60088',
        },
      },
      ...props.sx,
    }}
  />
);

export default AstroInput;
