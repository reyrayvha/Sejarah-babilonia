import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../../theme/tokens';
import { TorchFlame } from '../TorchFlame';
import { DustParticles } from '../DustParticles';

/**
 * Shot 2.1: Lorong & Dinding Istana Babilonia (0 - 90 frame / 3 detik)
 * Mengalir mulus dari akhir Scene 1, memperlihatkan lorong istana dengan
 * spanduk kerajaan Makedonia yang bergetar tertiup angin dan bayangan prajurit melintas.
 */
export const PalaceCorridorShot: React.FC = () => {
  const frame = useCurrentFrame();

  // Transisi masuk dari kegelapan gerbang Scene 1 (frame 0 - 25)
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transisi keluar menuju Shot 2.2 (frame 72 - 90)
  const fadeOut = interpolate(frame, [72, 90], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gerakan kamera perlahan menyusuri lorong (push-in halus)
  const cameraScale = interpolate(frame, [0, 90], [1.0, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraY = interpolate(frame, [0, 90], [0, -16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ayunan kain spanduk kekaisaran (kain sutra lapis lazuli & emas) tertiup angin lorong
  const clothSway = Math.sin(frame * 0.08) * 8;
  const clothRipple = Math.cos(frame * 0.12) * 5;

  // Bayangan prajurit bergerak melintasi dinding istana di latar belakang
  const shadowGuardX = interpolate(frame, [10, 85], [1200, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME_COLORS.obsidianBlack,
        opacity: Math.min(fadeIn, fadeOut),
        overflow: 'hidden',
      }}
    >
      {/* Container Kamera Dinamis */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: '50% 60%',
        }}
      >
        {/* 1. Latar Belakang Lorong Istana Babilonia (SVG) */}
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="corridorWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14100D" />
              <stop offset="45%" stopColor="#241B13" />
              <stop offset="100%" stopColor="#0B0907" />
            </linearGradient>

            <linearGradient id="pillarArchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E0C09" />
              <stop offset="25%" stopColor="#2A1F16" />
              <stop offset="70%" stopColor="#1B140E" />
              <stop offset="100%" stopColor="#090705" />
            </linearGradient>

            <linearGradient id="lapisGlazeTile" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#162A45" />
              <stop offset="50%" stopColor="#0D1B2A" />
              <stop offset="100%" stopColor="#182738" />
            </linearGradient>

            <radialGradient id="torchWallGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.35)" />
              <stop offset="60%" stopColor="rgba(180, 83, 9, 0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Dinding Utama Lorong */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#corridorWallGrad)" />

          {/* Lantai Batu Bata Mengkilap Dipoles Minyak */}
          <polygon points="0,1920 1080,1920 860,1320 220,1320" fill="#0A0907" />
          <line x1="220" y1="1320" x2="0" y2="1920" stroke="#1A140F" strokeWidth="3" />
          <line x1="860" y1="1320" x2="1080" y2="1920" stroke="#1A140F" strokeWidth="3" />
          {/* Garis ubin perspektif lorong */}
          <line x1="380" y1="1320" x2="270" y2="1920" stroke="#17120D" strokeWidth="2" />
          <line x1="540" y1="1320" x2="540" y2="1920" stroke="#1A140E" strokeWidth="2" />
          <line x1="700" y1="1320" x2="810" y2="1920" stroke="#17120D" strokeWidth="2" />

          {/* Garis Horizontal Ubin Lantai */}
          <line x1="180" y1="1420" x2="900" y2="1420" stroke="#1C1610" strokeWidth="2" />
          <line x1="120" y1="1560" x2="960" y2="1560" stroke="#1F1812" strokeWidth="2.5" />
          <line x1="50" y1="1740" x2="1030" y2="1740" stroke="#251D15" strokeWidth="3" />

          {/* Lengkungan Langit-Langit Kuno (Ceiling Vaults) di Kejauhan */}
          <path
            d="M 220,1320 Q 540,680 860,1320"
            fill="none"
            stroke="#1B140D"
            strokeWidth="18"
          />
          <path
            d="M 120,1460 Q 540,420 960,1460"
            fill="none"
            stroke="#140E0A"
            strokeWidth="28"
          />

          {/* Pilar Penyangga Lorong Sebelah Kiri */}
          <rect x="0" y="320" width="220" height="1600" fill="url(#pillarArchGrad)" />
          {/* Ornamen Keramik Lapis Lazuli Khas Gerbang Ishtar di Pilar Kiri */}
          <rect x="40" y="550" width="140" height="720" fill="url(#lapisGlazeTile)" opacity="0.6" />
          <rect x="40" y="550" width="140" height="720" stroke={THEME_COLORS.bronzeAccent} strokeWidth="3" fill="none" opacity="0.7" />
          {/* Pola Relief Bunga Roset Emas Mesopotamia */}
          <circle cx="110" cy="650" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />
          <circle cx="110" cy="850" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />
          <circle cx="110" cy="1050" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />

          {/* Pilar Penyangga Lorong Sebelah Kanan */}
          <rect x="860" y="320" width="220" height="1600" fill="url(#pillarArchGrad)" />
          {/* Ornamen Keramik Lapis Lazuli di Pilar Kanan */}
          <rect x="900" y="550" width="140" height="720" fill="url(#lapisGlazeTile)" opacity="0.6" />
          <rect x="900" y="550" width="140" height="720" stroke={THEME_COLORS.bronzeAccent} strokeWidth="3" fill="none" opacity="0.7" />
          <circle cx="970" cy="650" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />
          <circle cx="970" cy="850" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />
          <circle cx="970" cy="1050" r="22" fill="#1C140C" stroke={THEME_COLORS.sandOchre} strokeWidth="2" opacity="0.8" />

          {/* Bayangan Siluet Prajurit Bergerak (Guard Patrol Shadow) di Dinding Belakang */}
          <g transform={`translate(${shadowGuardX}, 1020)`} opacity="0.45" filter="blur(4px)">
            {/* Helm Phrygian runcing & kepala */}
            <circle cx="0" cy="-140" r="20" fill="#040302" />
            <polygon points="-5,-165 5,-165 0,-190" fill="#040302" />
            {/* Badan & jubah militer */}
            <path d="M -30,-115 L 30,-115 L 45,120 L -40,120 Z" fill="#040302" />
            {/* Tombak Sarissa panjang melintang */}
            <line x1="-120" y1="120" x2="60" y2="-280" stroke="#040302" strokeWidth="8" />
          </g>
        </svg>

        {/* 2. Spanduk Kekaisaran (Royal Banner of Alexander's Empire) */}
        {/* Kain sutra lapis lazuli megah bergelombang ditiup angin lorong */}
        <div
          style={{
            position: 'absolute',
            left: '360px',
            top: '280px',
            width: '360px',
            transform: `rotate(${clothSway * 0.15}deg)`,
            transformOrigin: 'top center',
          }}
        >
          <svg
            width="360"
            height="900"
            viewBox="0 0 360 900"
            style={{ overflow: 'visible', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.9))' }}
          >
            <defs>
              <linearGradient id="bannerFabricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B131E" />
                <stop offset="30%" stopColor="#182E4B" />
                <stop offset="70%" stopColor="#142337" />
                <stop offset="100%" stopColor="#080D15" />
              </linearGradient>

              <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C5A059" />
                <stop offset="50%" stopColor="#E5C77A" />
                <stop offset="100%" stopColor="#8C6E30" />
              </linearGradient>
            </defs>

            {/* Balok Gantungan Perunggu */}
            <rect x="0" y="0" width="360" height="18" fill="#3D2B1B" rx="4" />
            <circle cx="8" cy="9" r="14" fill="#6B4F30" />
            <circle cx="352" cy="9" r="14" fill="#6B4F30" />

            {/* Badan Kain Spanduk Lapis Lazuli dengan gelombang riak angin */}
            <path
              d={`
                M 30,18
                L 330,18
                Q ${330 + clothRipple},400 330,760
                L 180,${860 + clothRipple}
                L 30,760
                Q ${30 + clothRipple},400 30,18
                Z
              `}
              fill="url(#bannerFabricGrad)"
              stroke="url(#goldBorderGrad)"
              strokeWidth="5"
            />

            {/* Garis Aksen Emas Dalam */}
            <path
              d={`
                M 50,38
                L 310,38
                L 310,730
                L 180,${820 + clothRipple}
                L 50,730
                Z
              `}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="10 5"
              opacity="0.85"
            />

            {/* Simbol Bintang Vergina Makedonia 8 Penjuru (Vergina Sun / Macedonian Star) */}
            <g transform="translate(180, 380)">
              {/* Lingkaran pusat */}
              <circle cx="0" cy="0" r="26" fill="#140E0A" stroke="#D4AF37" strokeWidth="4" />
              <circle cx="0" cy="0" r="12" fill="#D4AF37" />
              {/* 8 Sinar Bintang Makedonia */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <polygon
                    key={`sun-ray-${i}`}
                    points="-8,0 8,0 0,-78"
                    fill="#D4AF37"
                    transform={`rotate(${angle})`}
                    opacity="0.9"
                  />
                );
              })}
            </g>

            {/* Rumbai Emas di Bagian Bawah Spanduk */}
            <line x1="30" y1="760" x2="180" y2={860 + clothRipple} stroke="#C5A059" strokeWidth="4" />
            <line x1="180" y1={860 + clothRipple} x2="330" y2="760" stroke="#C5A059" strokeWidth="4" />
          </svg>
        </div>

        {/* 3. Obor Lorong Istana Babilonia */}
        <TorchFlame x={110} y={920} scale={1.1} phaseOffset={0.5} glowRadius={380} />
        <TorchFlame x={970} y={920} scale={1.1} phaseOffset={2.7} glowRadius={380} />

        {/* 4. Partikel Debu Midground Melayang di Depan Cahaya Obor */}
        <DustParticles count={28} depthLayer="midground" />

        {/* 5. Vignette & Gradien Bayangan Lorong Bawah */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 65%, transparent 40%, rgba(5, 7, 10, 0.7) 85%, #05070A 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

