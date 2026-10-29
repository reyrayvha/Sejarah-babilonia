import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS, TYPOGRAPHY } from '../../theme/tokens';

/**
 * Komponen Pertanyaan Utama: “Siapa yang akan mewarisi imperium ini?”
 * Ditampilkan dalam 2 baris seimbang dengan tipografi serif klasik bereputasi tinggi,
 * kontras maksimal, dan transisi masuk yang khidmat dan tertahan (restrained).
 */
export const SuccessionQuestionText: React.FC = () => {
  const frame = useCurrentFrame();

  // Kemunculan teks yang khidmat dan tenang (frame 170 - 210 / detik 35.6 - 37)
  const textOpacity = interpolate(frame, [170, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pergerakan mikro ke atas (drift 12px) untuk memberi bobot visual
  const translateY = interpolate(frame, [170, 210], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spasi huruf merapat sangat halus saat memadat
  const letterSpacing = interpolate(frame, [170, 210], [0.18, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Garis aksen emas di bawah teks merekah perlahan
  const dividerWidth = interpolate(frame, [195, 230], [0, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (textOpacity <= 0.005) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '360px', // Area aman atas ponsel, tepat di atas takhta tanpa menutupi visual takhta
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        boxSizing: 'border-box',
        opacity: textOpacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      {/* Pertanyaan Utama Baris 1 & 2 */}
      <h1
        style={{
          fontFamily: TYPOGRAPHY.fontFamilySerif,
          fontSize: '52px',
          lineHeight: 1.35,
          fontWeight: 600,
          color: THEME_COLORS.parchmentCream,
          textAlign: 'center',
          letterSpacing: `${letterSpacing}em`,
          margin: 0,
          padding: 0,
          textShadow:
            '0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 40px rgba(0, 0, 0, 0.9), 0 0 10px rgba(212, 175, 55, 0.25)',
        }}
      >
        “Siapa yang akan mewarisi
        <br />
        imperium ini?”
      </h1>

      {/* Garis Aksen Emas Pembatas Minimalis */}
      <div
        style={{
          marginTop: '28px',
          width: `${dividerWidth}px`,
          height: '2px',
          background: `linear-gradient(to right, transparent, ${THEME_COLORS.sandOchre}, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: textOpacity,
        }}
      >
        {dividerWidth > 40 && (
          <div
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: THEME_COLORS.fadedGold,
              transform: 'rotate(45deg)',
              boxShadow: `0 0 8px ${THEME_COLORS.torchFlame}`,
            }}
          />
        )}
      </div>
    </div>
  );
};
