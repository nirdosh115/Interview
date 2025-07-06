import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import AstroButton from '../components/AstroButton';
import TrackRoadmap from '../components/TrackRoadmap';
import TrackChecklist from '../components/TrackChecklist';
import { getTracks } from '../api';

const TracksPage: React.FC = () => {
  const [tracksData, setTracksData] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(Array(8).fill(false));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getTracks()
      .then(data => setTracksData(data))
      .catch(() => setError('Failed to load tracks'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (idx: number) => {
    setChecked(prev => prev.map((c, i) => (i === idx ? !c : c)));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Prep Tracks</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {loading ? (
          <Typography sx={{ color: '#ffd600', width: '100%', textAlign: 'center', mt: 4 }}>Loading tracks...</Typography>
        ) : error ? (
          <Typography sx={{ color: 'red', width: '100%', textAlign: 'center', mt: 4 }}>{error}</Typography>
        ) : (
          tracksData.map((track: any, idx: number) => (
            <Box key={track.id || track.name || idx} sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6">{track.name || track}</Typography>
                {/* ...existing code for desc, progress, etc. ... */}
                <AstroButton variant="contained" onClick={() => setSelected(idx)} sx={{ mb: 2 }}>View Roadmap</AstroButton>
                {selected === idx && <TrackRoadmap progress={0} />}
                {selected === idx && <TrackChecklist checked={checked} onToggle={handleToggle} />}
              </Paper>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default TracksPage;
