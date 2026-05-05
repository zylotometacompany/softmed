import { Box, useTheme } from '@mui/material';
import { useId } from 'react';

export function FuturisticBackground() {
  const theme = useTheme();
  const id = useId();

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const bg = theme.palette.background.default;
  const paper = theme.palette.background.paper;
  const divider = theme.palette.divider;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`bg-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor={paper} />
          </linearGradient>

          <linearGradient id={`wave-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.18" />
            <stop offset="50%" stopColor={secondary} stopOpacity="0.12" />
            <stop offset="100%" stopColor={primary} stopOpacity="0.04" />
          </linearGradient>

          <radialGradient id={`glow-1-${id}`} cx="30%" cy="20%" r="50%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id={`glow-2-${id}`} cx="80%" cy="75%" r="45%">
            <stop offset="0%" stopColor={secondary} stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <pattern id={`grid-${id}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={divider}
              strokeWidth="0.8"
              opacity="0.08"
            />
          </pattern>

          <pattern id={`dots-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={primary} opacity="0.12" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#bg-grad-${id})`} />
        <rect width="100%" height="100%" fill={`url(#glow-1-${id})`} />
        <rect width="100%" height="100%" fill={`url(#glow-2-${id})`} />

        <path
          d="M0,240 C220,180 380,390 650,330 C940,265 1090,80 1440,150 L1440,0 L0,0 Z"
          fill={`url(#wave-grad-${id})`}
        />

        <path
          d="M0,900 L0,620 C180,560 340,650 520,610 C760,555 950,420 1180,470 C1290,495 1370,540 1440,580 L1440,900 Z"
          fill={`url(#wave-grad-${id})`}
          opacity="0.55"
        />

        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
        <rect width="100%" height="100%" fill={`url(#dots-${id})`} opacity="0.35" />

        <line
          x1="1100"
          y1="120"
          x2="1380"
          y2="120"
          stroke={primary}
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />
        <line
          x1="1180"
          y1="160"
          x2="1380"
          y2="160"
          stroke={secondary}
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <line
          x1="80"
          y1="760"
          x2="320"
          y2="760"
          stroke={primary}
          strokeOpacity="0.14"
          strokeWidth="1.2"
        />
      </svg>
    </Box>
  );
}