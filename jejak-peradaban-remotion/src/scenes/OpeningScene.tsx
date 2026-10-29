import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { AtmosphericSky } from '../components/AtmosphericSky';
import {
  ZigguratBackgroundSvg,
  PalaceMidgroundSvg,
  ForegroundPillarsSvg,
} from '../components/MesopotamianPalaceSvg';
import { TorchFlame } from '../components/TorchFlame';
import { DustParticles } from '../components/DustParticles';
import { Scene1ContextLabel } from '../components/Scene1ContextLabel';
import { THEME_COLORS } from '../theme/tokens';

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. REVEAL ATMOSFERIK AWAL (Frame 0 - 65)
  // Dimulai dari kegelapan total, perlahan siluet dan api obor tersingkap
  const openingFade = interpolate(frame, [0, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. TRANSISI AKHIR MENUJU ADEGAN 2 (Frame 215 - 240)
  // Penggelapan halus pada frame penutup untuk transisi mulus
  const endingDarken = interpolate(frame, [215, 240], [0, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. MASTER CAMERA PUSH-IN (0 - 240 Frame)
  // Pergerakan kamera maju yang berat, lambat, dan stabil
  const masterScale = interpolate(frame, [0, 240], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const masterPanY = interpolate(frame, [0, 240], [0, -22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. PARALLAX LAYER 2.5D
  // Background (Sky + Ziggurat): Bergerak paling lambat
  const bgScale = interpolate(frame, [0, 240], [1.0, 1.025]);
  const bgY = interpolate(frame, [0, 240], [0, -8]);

  // Midground (Gerbang Utama Istana + Obor): Bergerak moderat
  const mgScale = interpolate(frame, [0, 240], [1.0, 1.06]);
  const mgY = interpolate(frame, [0, 240], [0, -20]);

  // Foreground (Pilar framing terdekat): Bergerak paling cepat dengan pemisahan horizontal
  const fgScale = interpolate(frame, [0, 240], [1.0, 1.11]);
  const fgY = interpolate(frame, [0, 240], [0, -32]);

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: THEME_COLORS.obsidianBlack,
        overflow: 'hidden',
      }}
    >
      {/* ========================================================
          LAYER 1: BACKGROUND (Langit Malam + Ziggurat Etemenanki)
          ======================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${bgScale * masterScale}) translateY(${bgY + masterPanY}px)`,
          transformOrigin: '50% 65%',
        }}
      >
        <AtmosphericSky />
        <ZigguratBackgroundSvg />
        <DustParticles count={20} depthLayer="background" />
      </div>

      {/* ========================================================
          LAYER 2: KABUT PEMISAH KEDALAMAN (Depth Fog)
          ======================================================== */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '950px',
          width: '100%',
          height: '250px',
          background:
            'linear-gradient(to bottom, transparent, rgba(32, 23, 16, 0.45) 50%, transparent)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* ========================================================
          LAYER 3: MIDGROUND (Istana Monumental Babilonia & Obor)
          ======================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${mgScale * masterScale}) translateY(${mgY + masterPanY}px)`,
          transformOrigin: '50% 70%',
        }}
      >
        {/* Struktur Arsitektur Dinding & Gerbang */}
        <PalaceMidgroundSvg />

        {/* Obor Dinding Kiri (Menara Luar) */}
        <TorchFlame x={235} y={1240} scale={1.05} phaseOffset={0.2} glowRadius={360} />

        {/* Obor Dinding Kanan (Menara Luar) */}
        <TorchFlame x={845} y={1240} scale={1.05} phaseOffset={1.8} glowRadius={360} />

        {/* Obor Pengapit Gerbang Utama Sisi Kiri */}
        <TorchFlame x={415} y={1410} scale={1.15} phaseOffset={3.4} glowRadius={420} />

        {/* Obor Pengapit Gerbang Utama Sisi Kanan */}
        <TorchFlame x={665} y={1410} scale={1.15} phaseOffset={4.9} glowRadius={420} />

        {/* Obor Atas Parapet (Puncak Dinding Menara) */}
        <TorchFlame x={310} y={935} scale={0.85} phaseOffset={2.3} glowRadius={280} />
        <TorchFlame x={770} y={935} scale={0.85} phaseOffset={5.7} glowRadius={280} />

        {/* Partikel Debu Midground Melintasi Cahaya Obor */}
        <DustParticles count={35} depthLayer="midground" />
      </div>

      {/* ========================================================
          LAYER 4: FOREGROUND (Pilar & Balok Pembingkai Sinematik)
          ======================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${fgScale * masterScale}) translateY(${fgY + masterPanY}px)`,
          transformOrigin: '50% 50%',
        }}
      >
        <ForegroundPillarsSvg />
        <DustParticles count={10} depthLayer="foreground" />
      </div>

      {/* ========================================================
          LAYER 5: TIPOGRAFI HISTORIS MINIMAL (Konteks Babilonia 323 SM)
          ======================================================== */}
      <Scene1ContextLabel />

      {/* ========================================================
          LAYER 6: SINEMATIK VIGNETTE & MASING-MASING VEIL PERALIHAN
          ======================================================== */}
      {/* Vignette Sinematik Berat khas Film Dokumenter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 55%, transparent 45%, rgba(6, 6, 8, 0.4) 75%, rgba(3, 3, 5, 0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tabir Kegelapan Pembuka (Fade-in dari gelap di Frame 0-60) */}
      {openingFade > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: THEME_COLORS.obsidianBlack,
            opacity: openingFade,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Penggelapan Lembut Penutup (Transisi menuju Adegan 2) */}
      {endingDarken > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: THEME_COLORS.obsidianBlack,
            opacity: endingDarken,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

