import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

// Seeded random untuk posisi bintang yang deterministik
function seededRandom(seed: number) {
  const x = Math.sin(seed * 7823.456) * 10000;
  return x - Math.floor(x);
}

export const AtmosphericSky: React.FC = () => {
  const frame = useCurrentFrame();

  // Bintang di langit malam gurun Babilonia (deterministik)
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 45; i++) {
      const seed = (i + 1) * 19.82;
      const x = seededRandom(seed) * 1080;
      const y = seededRandom(seed + 1) * 750; // Hanya di bagian atas langit
      const size = 1 + seededRandom(seed + 2) * 1.8;
      const baseAlpha = 0.25 + seededRandom(seed + 3) * 0.45;
      list.push({ id: i, x, y, size, baseAlpha });
    }
    return list;
  }, []);

  // Haze horizontal bernapas sangat lambat
  const hazePulse = 0.95 + 0.05 * Math.sin(frame * 0.04);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. Latar Belakang Gradien Langit Malam Sinematik Babilonia */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 55%, #2B1E14 0%, #171E2B 45%, #0B111B 75%, #05070B 100%)`,
        }}
      />

      {/* 2. Bintang Malam Gurun Kuno */}
      {stars.map((star) => {
        const starTwinkle =
          star.baseAlpha * (0.8 + 0.2 * Math.sin(frame * 0.05 + star.id));
        return (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              backgroundColor: '#E6EDF5',
              opacity: starTwinkle,
            }}
          />
        );
      })}

      {/* 3. Kabut Hangat Horizon (Atmospheric Horizon Dust Glow) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '55%',
          width: '100%',
          height: '450px',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(94, 63, 34, 0.28) 40%, rgba(42, 28, 18, 0.45) 80%, transparent 100%)',
          filter: 'blur(30px)',
          opacity: hazePulse,
          transform: 'translateY(-50%)',
        }}
      />

      {/* 4. Lapisan Vignette Luar untuk Menjaga Fokus di Tengah */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, transparent 55%, rgba(4, 5, 8, 0.75) 100%)',
        }}
      />
    </div>
  );
};
