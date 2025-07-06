import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Chip } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AstroButton from '../components/AstroButton';
import AstroInput from '../components/AstroInput';
import AstroSearchBar from '../components/AstroSearchBar';
import { getTopics } from '../api';

const TopicDeepDivePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topicsData, setTopicsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Use backend search endpoint for live filtering
    import('../api').then(({ api }) =>
      api.get(`/topics/search?query=${encodeURIComponent(search)}&difficulty=${encodeURIComponent(difficulty)}`)
        .then(res => setTopicsData(res.data))
        .catch(() => setError('Failed to load topics'))
        .finally(() => setLoading(false))
    );
  }, [search, difficulty]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Topic Deep Dives</Typography>
      <Box sx={{ mb: 4, display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', background: 'rgba(40,30,80,0.7)', borderRadius: 3, p: 2, boxShadow: '0 2px 12px #ffd60033' }}>
        <AstroSearchBar
          placeholder="Search topics..."
          onSearch={setSearch}
          initialValue={search}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', background: '#2c2250', borderRadius: 2, px: 2, py: 1, boxShadow: '0 1px 6px #ffd60022' }}>
          <FilterAltIcon sx={{ color: '#ffd600', mr: 1 }} />
          <AstroInput
            select
            label="Difficulty"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            size="small"
            sx={{ minWidth: 120, background: 'transparent' }}
            SelectProps={{ native: true }}
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </AstroInput>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {loading ? (
          <Typography sx={{ color: '#ffd600', width: '100%', textAlign: 'center', mt: 4 }}>Loading topics...</Typography>
        ) : error ? (
          <Typography sx={{ color: 'red', width: '100%', textAlign: 'center', mt: 4 }}>{error}</Typography>
        ) : (
          topicsData
            .map(topic => (
              <Box key={topic.id} sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                <Paper elevation={2} sx={{ p: 3, background: 'rgba(40,30,80,0.92)', color: '#ffd600', border: '1px solid #ffd60055' }}>
                  <Typography variant="h6">{topic.name}</Typography>
                  <Typography color="#ffd600b0">{topic.description}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="Q&A" color="primary" sx={{ mr: 1, background: '#512da8', color: '#ffd600', border: '1px solid #ffd60055' }} />
                    <Chip label="Playground" color="secondary" sx={{ mr: 1, background: '#00bcd4', color: '#fff', border: '1px solid #ffd60055' }} />
                    <Chip label="Mistakes" color="warning" sx={{ background: '#ffd600', color: '#512da8', border: '1px solid #ffd60055' }} />
                  </Box>
                  <AstroButton variant="contained" href={`/topics/${topic.id}`} sx={{ mt: 2, px: 4, py: 1, fontWeight: 700, fontSize: 16 }}>
                    Explore
                  </AstroButton>
                </Paper>
              </Box>
            ))
        )}
      </Box>
    </Container>
  );
};

export default TopicDeepDivePage;
