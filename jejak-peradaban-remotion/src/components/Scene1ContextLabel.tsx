import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS, TYPOGRAPHY } from '../theme/tokens';

export const Scene1ContextLabel: React.FC = () => {
  const frame = useCurrentFrame();

  // Kemunculan halus (frame 45-75), bertahan, lalu menghilang halus (frame 175-205)
  const opacity = interpolate(
    frame,
    [45, 75, 175, 205],
    [0, 0.9, 0.9, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Pergerakan tipografi naik sangat perlahan (mikro drift 8px)
  const translateY = interpolate(
    frame,
    [45, 205],
    [10, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  if (opacity <= 0.01) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '180px', // Area aman atas pada layar vertikal ponsel
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Label Lokasi & Tahun */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontFamilySerif,
          fontSize: '26px',
          letterSpacing: '0.42em',
          color: THEME_COLORS.parchmentCream,
          textTransform: 'uppercase',
          textShadow: '0 2px 16px rgba(0, 0, 0, 0.9)',
          fontWeight: 600,
        }}
      >
        Babilonia — 323 SM
      </div>

      {/* Garis Aksen Perunggu Minimalis */}
      <div
        style={{
          marginTop: '12px',
          width: '60px',
          height: '1.5px',
          background: `linear-gradient(to right, transparent, ${THEME_COLORS.bronzeAccent}, transparent)`,
        }}
      />
    </div>
  );
};

