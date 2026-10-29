import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

interface Particle {
  id: number;
  startX: number;
  startY: number;
  size: number;
  baseOpacity: number;
  driftSpeedY: number;
  swaySpeedX: number;
  swayAmp: number;
  color: string;
}

// Pseudo-random generator dengan seed konstan agar deterministik
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}

interface DustParticlesProps {
  count?: number;
  depthLayer?: 'background' | 'midground' | 'foreground';
}

export const DustParticles: React.FC<DustParticlesProps> = ({
  count = 35,
  depthLayer = 'midground',
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    const layerMultiplier =
      depthLayer === 'foreground' ? 1.6 : depthLayer === 'background' ? 0.7 : 1.0;

    for (let i = 0; i < count; i++) {
      const seed = (i + 1) * 31.415;
      const r1 = seededRandom(seed);
      const r2 = seededRandom(seed + 1);
      const r3 = seededRandom(seed + 2);
      const r4 = seededRandom(seed + 3);

      const size = (1.5 + r3 * 3.5) * layerMultiplier;
      const isWarm = r4 > 0.45;

      list.push({
        id: i,
        startX: r1 * 1080,
        startY: r2 * 1920,
        size,
        baseOpacity: (0.15 + r4 * 0.45) * (depthLayer === 'background' ? 0.5 : 1.0),
        driftSpeedY: (0.3 + r2 * 0.6) * layerMultiplier,
        swaySpeedX: 0.02 + r3 * 0.03,
        swayAmp: 15 + r1 * 25,
        color: isWarm ? 'rgba(245, 180, 80, ' : 'rgba(215, 195, 160, ',
      });
    }
    return list;
  }, [count, depthLayer]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => {
        // Posisi Y bergerak ke atas secara deterministik dan melingkar (wrap around)
        const totalHeight = 2100;
        const currentY =
          ((p.startY - frame * p.driftSpeedY) % totalHeight + totalHeight) % totalHeight - 100;

        // Ayunan horizontal menggunakan fungsi gelombang sinus
        const currentX = p.startX + Math.sin(frame * p.swaySpeedX + p.id) * p.swayAmp;

        // Opacity berkilau lembut (subtle twinkle)
        const twinkle =
          p.baseOpacity * (0.8 + 0.2 * Math.sin(frame * 0.08 + p.id * 1.5));

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: `${p.color}${twinkle})`,
              filter:
                depthLayer === 'foreground'
                  ? 'blur(1.5px)'
                  : depthLayer === 'background'
                  ? 'blur(0.8px)'
                  : 'none',
              boxShadow:
                p.size > 3
                  ? `0 0 ${p.size * 2}px ${p.color}${twinkle * 0.8})`
                  : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
