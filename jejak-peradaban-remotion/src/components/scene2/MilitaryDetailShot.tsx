import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../../theme/tokens';
import { DustParticles } from '../DustParticles';

/**
 * Shot 2.2: Detail Militer — Perisai Perunggu Makedonia, Helm, & Tombak (90 - 210 frame / 4 detik)
 * Close-up sinematik perisai perunggu (Aspis) berukir bintang Makedonia dan helm Phrygian
 * yang tersinari obor, dengan siluet prajurit bersenjata tegak dalam keheningan tegang.
 */
export const MilitaryDetailShot: React.FC = () => {
  const frame = useCurrentFrame();

  // Offset lokal frame untuk shot ini (berjalan dari frame 90 hingga 210 pada Scene 2)
  const shotFrame = Math.max(0, frame - 90);

  // Transisi masuk (frame 90 - 110)
  const fadeIn = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transisi keluar menuju Shot 2.3 (frame 192 - 210)
  const fadeOut = interpolate(frame, [192, 210], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gerakan kamera sinematik: pergeseran lambat dari kiri-bawah ke kanan-atas (pan & slow push)
  const cameraScale = interpolate(shotFrame, [0, 120], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraX = interpolate(shotFrame, [0, 120], [-15, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraY = interpolate(shotFrame, [0, 120], [10, -10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Modulasi kerlipan obor pada permukaan logam perunggu (deterministik)
  const metalTorchFlicker =
    1.0 +
    0.09 * Math.sin(frame * 0.45) +
    0.06 * Math.sin(frame * 0.9 + 1.2) +
    0.03 * Math.sin(frame * 1.8 + 2.5);

  const specularHighlightOpacity = 0.55 * metalTorchFlicker;

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translate(${cameraX}px, ${cameraY}px)`,
          transformOrigin: '45% 55%',
        }}
      >
        {/* 1. Latar Belakang Dinding Batu & Sumber Cahaya Samping */}
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            {/* Gradien tekstur dinding batu bertekstur gelap */}
            <linearGradient id="stoneWallBackdrop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B140E" />
              <stop offset="40%" stopColor="#120E0A" />
              <stop offset="100%" stopColor="#070605" />
            </linearGradient>

            {/* Sorotan cahaya obor dari sisi kiri atas mengenai logam perunggu */}
            <radialGradient id="torchGleam" cx="20%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.45)" />
              <stop offset="40%" stopColor="rgba(194, 120, 24, 0.18)" />
              <stop offset="85%" stopColor="transparent" />
            </radialGradient>

            {/* Gradien Logam Perunggu Kuno (Aged Bronze) */}
            <radialGradient id="bronzeShieldGrad" cx="42%" cy="42%" r="60%">
              <stop offset="0%" stopColor="#D4A759" />
              <stop offset="25%" stopColor="#A87738" />
              <stop offset="65%" stopColor="#5E3D18" />
              <stop offset="90%" stopColor="#321F0D" />
              <stop offset="100%" stopColor="#1A1107" />
            </radialGradient>

            {/* Kilau Lingkaran Perisai Luar */}
            <linearGradient id="shieldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAD788" />
              <stop offset="35%" stopColor="#8C5C24" />
              <stop offset="70%" stopColor="#2E1D0C" />
              <stop offset="100%" stopColor="#B38036" />
            </linearGradient>

            {/* Kilau Mata Tombak Baja/Perunggu */}
            <linearGradient id="spearBladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2D4BF" />
              <stop offset="45%" stopColor="#7E6852" />
              <stop offset="55%" stopColor="#2D241C" />
              <stop offset="100%" stopColor="#A48C70" />
            </linearGradient>
          </defs>

          {/* Dinding Ruang Senjata Istana */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#stoneWallBackdrop)" />

          {/* Sinar Pendaran Obor di Dinding Belakang */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#torchGleam)" opacity={metalTorchFlicker} />

          {/* Balok Batu Tempat Peletakan Perisai (Stone Plinth) */}
          <polygon points="120,1540 980,1540 1080,1920 0,1920" fill="#0C0A08" />
          <line x1="120" y1="1540" x2="980" y2="1540" stroke="#2B2117" strokeWidth="4" />
          <line x1="120" y1="1540" x2="0" y2="1920" stroke="#1A140F" strokeWidth="3" />
          <line x1="980" y1="1540" x2="1080" y2="1920" stroke="#1A140F" strokeWidth="3" />

          {/* --- SILUET PRAJURIT PENGAWAL BERDIRI DALAM KESENYAPAN DI LATAR BELAKANG --- */}
          <g opacity="0.68" transform="translate(760, 520)">
            {/* Tombak Sarissa Tegak Menjulang Tinggi ke Atas Frame */}
            <line x1="30" y1="950" x2="30" y2="-200" stroke="#3D2E1F" strokeWidth="7" />
            {/* Mata Tombak Perunggu */}
            <polygon points="25,-200 35,-200 30,-260" fill="url(#spearBladeGrad)" />
            {/* Helm Phrygian dengan Jambul Bulu Kuda Khas Pasukan Elit Alexander */}
            <circle cx="0" cy="180" r="28" fill="#070605" />
            <path d="M -22,175 Q 0,130 22,175 Z" fill="#070605" />
            {/* Jambul Helm Melengkung ke Belakang */}
            <path
              d="M -15,145 Q 10,95 45,150 Q 20,120 -5,145 Z"
              fill="#18120B"
            />
            {/* Pelindung Pipi & Bahu Siluet Prajurit */}
            <path d="M -30,210 L 30,210 L 45,580 L -35,580 Z" fill="#070605" />
            {/* Jubah Militer & Lipatan Kain Gelap */}
            <path d="M -40,580 L 50,580 L 60,950 L -50,950 Z" fill="#050403" />
          </g>

          {/* --- PERISAI PERUNGGU MAKEDONIA UTAMA (ASPIS) — FOKUS UTAMA CLOSE-UP --- */}
          <g transform="translate(480, 1140)">
            {/* Bayangan Tebal Perisai ke Dinding & Lantai */}
            <ellipse cx="25" cy="45" rx="340" ry="340" fill="#040302" opacity="0.8" />

            {/* Piringan Perisai Utama */}
            <circle cx="0" cy="0" r="330" fill="url(#bronzeShieldGrad)" stroke="url(#shieldRimGrad)" strokeWidth="22" />

            {/* Cincin Logam Konsentris (Forged Concentric Rings) */}
            <circle cx="0" cy="0" r="290" fill="none" stroke="#68471D" strokeWidth="5" opacity="0.8" />
            <circle cx="0" cy="0" r="230" fill="none" stroke="#4A3114" strokeWidth="4" opacity="0.7" />
            <circle cx="0" cy="0" r="160" fill="none" stroke="#7A5222" strokeWidth="3" opacity="0.8" />
            <circle cx="0" cy="0" r="80" fill="none" stroke="#9A692D" strokeWidth="4" opacity="0.9" />

            {/* Paku Rivet Perunggu Melingkar di Tepian Perisai */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              const rx = Math.cos(rad) * 310;
              const ry = Math.sin(rad) * 310;
              return (
                <circle
                  key={`rivet-${i}`}
                  cx={rx}
                  cy={ry}
                  r="5"
                  fill="#E5C77A"
                  stroke="#5A3A16"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Lambang Relief Bintang Vergina Makedonia 8 Penjuru di Tengah Perisai */}
            <g>
              <circle cx="0" cy="0" r="36" fill="#3D260F" stroke="#E5C77A" strokeWidth="3" />
              <circle cx="0" cy="0" r="18" fill="#F0D58C" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <polygon
                    key={`shield-star-${i}`}
                    points="-14,0 14,0 0,-135"
                    fill="#C59E4E"
                    stroke="#5E3B14"
                    strokeWidth="2"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
            </g>

            {/* Specular Highlight Cahaya Obor Mengilat di Lengkungan Logam Kiri Atas */}
            <path
              d="M -240,-180 A 300,300 0 0,1 -60,-295"
              stroke="#FFF1C2"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              filter="blur(3px)"
              opacity={specularHighlightOpacity}
            />
          </g>

          {/* --- HELM PERUNGGU MAKEDONIA BERSANDAR DI SAMPING PERISAI --- */}
          <g transform="translate(180, 1380)">
            {/* Siluet Kubah Helm & Pelindung Tengkuk */}
            <path
              d="M 40,80 Q 90,-70 190,-70 Q 280,-60 300,50 Q 310,120 280,180 L 80,180 Z"
              fill="#261A0F"
              stroke="#875E28"
              strokeWidth="4"
            />
            {/* Pelindung Pipi Perunggu (Cheek Guard) */}
            <path
              d="M 120,70 L 150,190 L 100,200 L 80,100 Z"
              fill="#3A2716"
              stroke="#A87938"
              strokeWidth="3"
            />
            {/* Garis Kilau Api Obor pada Punggung Helm */}
            <path
              d="M 110,-40 Q 180,-60 260,-30"
              stroke="#FAD788"
              strokeWidth="6"
              fill="none"
              opacity={specularHighlightOpacity * 0.9}
            />
          </g>

          {/* --- TOMBAK SARISSA DI FOREGROUND KIRI — CONDONG KE ARAH RUANG TENGAH --- */}
          <g>
            {/* Gagang Kayu Ash Pohon Keras Khas Yunani/Makedonia */}
            <line x1="80" y1="1920" x2="380" y2="400" stroke="#2B1F15" strokeWidth="14" />
            <line x1="82" y1="1920" x2="382" y2="400" stroke="#4A3725" strokeWidth="3" />
            {/* Soket Perunggu Pengikat Mata Tombak */}
            <polygon points="368,430 388,422 396,370 376,378" fill="#755022" />
            {/* Mata Tombak Runcing Menangkap Cahaya Dingin */}
            <polygon points="380,380 430,220 370,250" fill="url(#spearBladeGrad)" />
            {/* Kilau Runcing Mata Tombak */}
            <line x1="390" y1="360" x2="425" y2="235" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.75" />
          </g>
        </svg>

        {/* 2. Partikel Debu Midground Melayang di Atas Permukaan Logam */}
        <DustParticles count={24} depthLayer="midground" />

        {/* 3. Volumetric Rim & Vignette Sinematik */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 45% 55%, transparent 45%, rgba(6, 7, 9, 0.65) 80%, #05070A 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

