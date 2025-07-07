import { CircularProgress, Stack } from '@mui/material';

function GradientCircularProgress() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </>
  );
}

export default function Loader() {
  return (
    <Stack
      spacing={2}
      sx={{
        position: 'fixed', // use fixed for full viewport overlay
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        backgroundColor: 'rgba(0,0,0,0.1)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GradientCircularProgress />
    </Stack>
  );
}
