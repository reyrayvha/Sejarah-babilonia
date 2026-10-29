import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../theme/tokens';

interface TorchFlameProps {
  x: number; // Posisi X (px)
  y: number; // Posisi Y (px)
  scale?: number;
  phaseOffset?: number;
  glowRadius?: number;
  showSconce?: boolean;
}

export const TorchFlame: React.FC<TorchFlameProps> = ({
  x,
  y,
  scale = 1,
  phaseOffset = 0,
  glowRadius = 380,
  showSconce = true,
}) => {
  const frame = useCurrentFrame();

  // Multi-frequency sine waves untuk simulasi lidah api dan kerlipan cahaya alami
  const flicker =
    1.0 +
    0.07 * Math.sin(frame * 0.38 + phaseOffset) +
    0.05 * Math.sin(frame * 0.85 + phaseOffset * 1.7) +
    0.03 * Math.sin(frame * 1.62 + phaseOffset * 2.9);

  const flameWobbleX = Math.sin(frame * 0.28 + phaseOffset) * 2.5 * scale;
  const flameStretchY = (1.0 + 0.12 * Math.sin(frame * 0.42 + phaseOffset * 1.3)) * scale;

  const currentGlowRadius = glowRadius * flicker * scale;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      {/* 1. Ambient Radial Glow menyebar ke dinding mudbrick di sekitar obor */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: `${currentGlowRadius * 2}px`,
          height: `${currentGlowRadius * 2}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(245, 158, 11, ${
            0.32 * flicker
          }) 0%, rgba(217, 119, 6, ${0.16 * flicker}) 35%, rgba(180, 83, 9, ${
            0.06 * flicker
          }) 65%, transparent 80%)`,
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Sconce / Brazier Perunggu Kuno Babilonia */}
      {showSconce && (
        <svg
          width={40 * scale}
          height={60 * scale}
          viewBox="0 0 40 60"
          style={{
            position: 'absolute',
            left: `${-20 * scale}px`,
            top: `${-10 * scale}px`,
            overflow: 'visible',
          }}
        >
          {/* Tangkai dan dudukan perunggu ke dinding */}
          <path
            d="M 20,25 L 20,55 M 10,55 L 30,55 M 20,40 L 32,50"
            stroke={THEME_COLORS.bronzeAccent}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Mangkuk api berundak khas Mesopotamia */}
          <polygon
            points="6,25 34,25 28,35 12,35"
            fill="#1F160E"
            stroke={THEME_COLORS.warmBronze}
            strokeWidth="1.5"
          />
          {/* Cincin pengikat */}
          <ellipse
            cx="20"
            cy="25"
            rx="14"
            ry="4"
            fill="#2D1F13"
            stroke={THEME_COLORS.warmBronze}
            strokeWidth="1.2"
          />
        </svg>
      )}

      {/* 3. Lidah Api Luar (Warm Amber) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${-18 * scale}px`,
          width: `${22 * scale}px`,
          height: `${44 * flameStretchY}px`,
          transform: `translate(-50%, -100%) translateX(${flameWobbleX}px)`,
          borderRadius: '50% 50% 35% 35% / 70% 70% 30% 30%',
          background: `linear-gradient(to top, ${THEME_COLORS.torchAmber}, ${THEME_COLORS.torchFlame}, transparent)`,
          filter: 'blur(1.5px)',
          opacity: 0.95 * flicker,
        }}
      />

      {/* 4. Lidah Api Inti (Bright Core & Yellow Glow) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${-20 * scale}px`,
          width: `${12 * scale}px`,
          height: `${28 * flameStretchY}px`,
          transform: `translate(-50%, -100%) translateX(${flameWobbleX * 0.7}px)`,
          borderRadius: '50% 50% 40% 40% / 75% 75% 25% 25%',
          background: `linear-gradient(to top, ${THEME_COLORS.torchInnerGlow}, ${THEME_COLORS.torchCore})`,
          boxShadow: `0 0 16px ${THEME_COLORS.torchFlame}`,
          filter: 'blur(0.8px)',
        }}
      />

      {/* 5. Embers / Percikan Api Deterministik */}
      {[0, 1, 2].map((i) => {
        const emberSeed = i + phaseOffset;
        const emberLife = ((frame * 0.8 + emberSeed * 40) % 80) / 80; // 0 to 1
        const emberY = -35 * scale - emberLife * 70 * scale;
        const emberX = Math.sin(frame * 0.15 + emberSeed * 5) * 14 * scale;
        const emberOpacity = (1 - emberLife) * 0.8;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${emberX}px)`,
              top: `${emberY}px`,
              width: `${2 * scale}px`,
              height: `${2 * scale}px`,
              borderRadius: '50%',
              backgroundColor: THEME_COLORS.torchCore,
              boxShadow: `0 0 4px ${THEME_COLORS.torchFlame}`,
              opacity: emberOpacity,
            }}
          />
        );
      })}
    </div>
  );
};

