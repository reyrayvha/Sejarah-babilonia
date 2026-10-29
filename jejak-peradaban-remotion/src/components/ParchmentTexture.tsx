import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../theme/tokens';

/**
 * Komponen Tekstur Pergamum Kuno & Pencahayaan Meja Perang (War Council Table)
 * Menampilkan permukaan pergamum tua dengan vignetting sinematik dan pendaran
 * cahaya obor/lilin deterministik yang menyinari peta kuno.
 */
export const ParchmentTexture: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // Kerlipan cahaya lilin/obor deterministik di atas meja peta
  const lampFlicker =
    1.0 +
    0.06 * Math.sin(frame * 0.35) +
    0.04 * Math.sin(frame * 0.72 + 1.4) +
    0.02 * Math.sin(frame * 1.5 + 2.8);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME_COLORS.obsidianBlack,
        overflow: 'hidden',
      }}
    >
      {/* 1. Latar Belakang Meja Kayu Hitam / Ruang Gelap */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #15100B 0%, #0A0806 70%, #040302 100%)',
        }}
      />

      {/* 2. Tekstur Pergamum Lembaran Kuno */}
      <div
        style={{
          position: 'absolute',
          inset: '30px',
          borderRadius: '4px',
          background: `radial-gradient(ellipse at 48% 52%, ${THEME_COLORS.mapParchmentLight} 0%, ${THEME_COLORS.mapParchment} 60%, #100C08 100%)`,
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.85), 0 15px 40px rgba(0,0,0,0.95)',
          overflow: 'hidden',
        }}
      >
        {/* Garis-garis serat kain pergamum halus (Organic Parchment Fibers) */}
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}
        >
          <filter id="parchmentNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#parchmentNoise)" />
        </svg>

        {/* 3. Sorotan Cahaya Obor / Lampu Meja Strategi (Torchlight Pool) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '52%',
            width: '1200px',
            height: '1400px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse at center, rgba(245, 158, 11, ${
              0.22 * lampFlicker
            }) 0%, rgba(217, 119, 6, ${
              0.12 * lampFlicker
            }) 35%, rgba(158, 109, 56, 0.05) 60%, transparent 80%)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />

        {/* Konten Peta */}
        {children}

        {/* 4. Bingkai Tepi Pergamum Bergaya Kartografi Kuno */}
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            border: `1.5px solid ${THEME_COLORS.bronzeAccent}`,
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '22px',
            border: `0.75px dashed ${THEME_COLORS.fadedGold}`,
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        {/* Ornamen Sudut Kartografi Klasik */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
          const isTop = corner.startsWith('top');
          const isLeft = corner.endsWith('left');
          return (
            <div
              key={corner}
              style={{
                position: 'absolute',
                top: isTop ? '26px' : 'auto',
                bottom: isTop ? 'auto' : '26px',
                left: isLeft ? '26px' : 'auto',
                right: isLeft ? 'auto' : '26px',
                width: '16px',
                height: '16px',
                borderTop: isTop ? `2px solid ${THEME_COLORS.sandOchre}` : 'none',
                borderBottom: isTop ? 'none' : `2px solid ${THEME_COLORS.sandOchre}` ,
                borderLeft: isLeft ? `2px solid ${THEME_COLORS.sandOchre}` : 'none',
                borderRight: isLeft ? 'none' : `2px solid ${THEME_COLORS.sandOchre}`,
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>

      {/* 5. Vignette Luar Sinematik untuk Menjaga Fokus Vertikal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, transparent 45%, rgba(5, 7, 10, 0.65) 75%, #05070A 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

