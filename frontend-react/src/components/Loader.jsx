import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
    <CircularProgress color="inherit" size={20}/>
  </Box>
  );
};

export default Loader;
