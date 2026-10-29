import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../../theme/tokens';
import { TorchFlame } from '../TorchFlame';
import { DustParticles } from '../DustParticles';

/**
 * Shot 2.3: Takhta yang Kosong & Ketegangan Para Penerus (210 - 300 frame / 3 detik)
 * Ruang takhta megah Istana Babilonia. Sorotan cahaya jatuh ke atas takhta kerajaan yang kosong,
 * sementara siluet para jenderal dan pengawal berdiri terpaku dalam keheningan tegang.
 */
export const EmptyThroneShot: React.FC = () => {
  const frame = useCurrentFrame();

  // Offset lokal untuk shot ini (berjalan dari frame 210 hingga 300)
  const shotFrame = Math.max(0, frame - 210);

  // Transisi masuk dari Shot 2.2 (frame 210 - 230)
  const fadeIn = interpolate(frame, [210, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transisi keluar halus menuju Scene 3 Peta Imperium (frame 285 - 300)
  const fadeOut = interpolate(frame, [285, 300], [1, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gerakan kamera: dorongan lambat yang khidmat dan berat ke arah takhta yang kosong
  const cameraScale = interpolate(shotFrame, [0, 90], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraY = interpolate(shotFrame, [0, 90], [0, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cahaya berkas (volumetric light beam) yang menyorot takhta kosong
  const beamFlicker = 0.85 + 0.08 * Math.sin(frame * 0.25) + 0.04 * Math.cos(frame * 0.6);

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
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: '50% 68%',
        }}
      >
        {/* 1. Latar Belakang Aula Takhta Babilonia & Takhta Kosong (SVG) */}
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, width: '1080px', height: '1920px' }}
        >
          <defs>
            {/* Gradien aula megah berundak */}
            <linearGradient id="throneHallBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080706" />
              <stop offset="50%" stopColor="#17120D" />
              <stop offset="100%" stopColor="#0B0907" />
            </linearGradient>

            {/* Berkas Cahaya Sinematik Menyorot Takhta (Volumetric Beam) */}
            <linearGradient id="divineLightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(244, 232, 193, 0.45)" />
              <stop offset="35%" stopColor="rgba(212, 175, 55, 0.22)" />
              <stop offset="80%" stopColor="rgba(194, 155, 56, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Gradien Undakan Takhta Batu (Stone Dais) */}
            <linearGradient id="stoneDaisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34281E" />
              <stop offset="40%" stopColor="#221912" />
              <stop offset="100%" stopColor="#100C09" />
            </linearGradient>

            {/* Gradien Takhta Emas & Perunggu (The Empty Throne) */}
            <linearGradient id="goldThroneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7E5621" />
              <stop offset="40%" stopColor="#D4A759" />
              <stop offset="70%" stopColor="#F5D78E" />
              <stop offset="100%" stopColor="#5E3E16" />
            </linearGradient>

            {/* Kain Sutra Jubah Kerajaan Tersampir Kosong (Royal Purple & Crimson) */}
            <linearGradient id="drapedClothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A1521" />
              <stop offset="60%" stopColor="#2A1325" />
              <stop offset="100%" stopColor="#140A12" />
            </linearGradient>
          </defs>

          {/* Dinding Belakang Aula Takhta */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#throneHallBack)" />

          {/* Kolom-Kolom Raksasa Aula di Kiri & Kanan (Colonnade) */}
          <polygon points="0,0 180,0 140,1920 0,1920" fill="#0D0B08" />
          <polygon points="1080,0 900,0 940,1920 1080,1920" fill="#0D0B08" />

          {/* Kolom Lapisan Kedua (Kedalaman Menengah) */}
          <polygon points="180,200 300,200 260,1650 160,1650" fill="#140F0B" />
          <polygon points="900,200 780,200 820,1650 920,1650" fill="#140F0B" />

          {/* Lengkungan Dinding Istana Belakang Takhta */}
          <path
            d="M 320,1350 Q 540,650 760,1350"
            fill="none"
            stroke="#1C150E"
            strokeWidth="16"
          />
          <path
            d="M 360,1350 Q 540,780 720,1350"
            fill="none"
            stroke="#261C13"
            strokeWidth="10"
          />

          {/* Lantai Aula Berlapis Marmer & Bata Bakar Hitam */}
          <polygon points="0,1920 1080,1920 880,1380 200,1380" fill="#080705" />
          <line x1="200" y1="1380" x2="0" y2="1920" stroke="#1C1610" strokeWidth="2.5" />
          <line x1="880" y1="1380" x2="1080" y2="1920" stroke="#1C1610" strokeWidth="2.5" />

          {/* --- BERKAS CAHAYA SOROT DARI ATAS KE TAKHTA --- */}
          <polygon
            points="540,120 420,1460 660,1460"
            fill="url(#divineLightBeam)"
            opacity={beamFlicker * 0.9}
            filter="blur(16px)"
          />

          {/* --- UNDAKAN TAKHTA BATU BERTINGKAT TIGA (THREE-TIERED STONE DAIS) --- */}
          {/* Tingkat 1 (Paling Bawah) */}
          <polygon points="320,1440 760,1440 810,1485 270,1485" fill="url(#stoneDaisGrad)" stroke="#4A3A2A" strokeWidth="1.5" />
          {/* Tingkat 2 */}
          <polygon points="360,1395 720,1395 750,1440 330,1440" fill="url(#stoneDaisGrad)" stroke="#4A3A2A" strokeWidth="1.5" />
          {/* Tingkat 3 (Platform Utama Takhta) */}
          <polygon points="400,1350 680,1350 705,1395 375,1395" fill="url(#stoneDaisGrad)" stroke="#5A4734" strokeWidth="2" />

          {/* Karpet Merah/Ungu Kerajaan Membentang Turun dari Undakan */}
          <polygon points="485,1350 595,1350 620,1540 460,1540" fill="#3D121B" stroke="#66202D" strokeWidth="1" />

          {/* --- STRUKTUR TAKHTA KERAJAAN YANG KOSONG (THE EMPTY THRONE) --- */}
          <g transform="translate(540, 1315)">
            {/* Bayangan Takhta di Atas Platform */}
            <ellipse cx="0" cy="35" rx="90" ry="20" fill="#050403" opacity="0.8" />

            {/* Sandaran Punggung Takhta (Backrest) Berukir Simbol Singa & Mahkota Kuno */}
            <path
              d="M -55,-130 Q 0,-165 55,-130 L 50,20 L -50,20 Z"
              fill="url(#goldThroneGrad)"
              stroke="#D4A759"
              strokeWidth="4"
            />
            {/* Ornamen Puncak Sandaran Takhta */}
            <polygon points="-55,-130 -45,-155 -35,-135" fill="#E5C77A" />
            <polygon points="55,-130 45,-155 35,-135" fill="#E5C77A" />
            <polygon points="-12,-165 0,-185 12,-165" fill="#FCE9AA" />

            {/* Kaki Takhta Berukir Cakar Singa Kuno (Lion Paw Legs) */}
            <rect x="-65" y="15" width="18" height="30" fill="#916527" rx="3" />
            <rect x="47" y="15" width="18" height="30" fill="#916527" rx="3" />

            {/* Alas Duduk Takhta (Seat Base) */}
            <rect x="-70" y="5" width="140" height="20" fill="#A87733" stroke="#F5D78E" strokeWidth="2.5" rx="4" />

            {/* Pegangan Tangan Takhta (Armrests) Berukir Kepala Singa */}
            <rect x="-75" y="-35" width="16" height="45" fill="#B5863D" stroke="#D4A759" strokeWidth="2" />
            <circle cx="-67" cy="-38" r="10" fill="#FCE9AA" />
            <rect x="59" y="-35" width="16" height="45" fill="#B5863D" stroke="#D4A759" strokeWidth="2" />
            <circle cx="67" cy="-38" r="10" fill="#FCE9AA" />

            {/* KAIN JUBAH KEKELASAN TERSAMPIR KOSONG — TANPA RAJA (The Vacant Royal Mantle) */}
            {/* Menegaskan bahwa Alexander telah tiada */}
            <path
              d="M -35,-60 Q 15,-50 40,-20 L 45,35 Q 20,40 -20,38 L -45,15 Z"
              fill="url(#drapedClothGrad)"
              stroke="#802135"
              strokeWidth="1.5"
            />
            {/* Tepi Sulaman Benang Emas pada Jubah */}
            <path
              d="M 40,-20 L 45,35 Q 20,40 -20,38"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </g>

          {/* --- SILUET PARA JENDERAL / DIADOCHI DALAM KEHENINGAN (THE HEIRS IN VIGIL) --- */}
          {/* Tokoh 1 (Jenderal Kiri Dalam Jubah Panglima, Menatap Takhta) */}
          <g transform="translate(240, 1420)" opacity="0.9">
            {/* Kepala bermahkota perunggu/helm */}
            <circle cx="0" cy="-110" r="18" fill="#070605" />
            <path d="M -15,-108 Q 0,-130 15,-108 Z" fill="#070605" />
            {/* Tubuh & jubah komandan */}
            <path d="M -25,-90 L 25,-90 L 32,80 L -30,80 Z" fill="#050403" />
            {/* Tangan bersedekap di dada / di pinggang pedang */}
            <path d="M -28,-70 L 15,-60 L -10,-40 Z" fill="#080706" />
          </g>

          {/* Tokoh 2 (Prajurit Pengawal Tombak di Sisi Kiri) */}
          <g transform="translate(140, 1400)" opacity="0.8">
            <line x1="20" y1="90" x2="20" y2="-220" stroke="#251B12" strokeWidth="5" />
            <polygon points="17,-220 23,-220 20,-260" fill="#6B5033" />
            <circle cx="0" cy="-100" r="16" fill="#060504" />
            <path d="M -20,-82 L 20,-82 L 24,90 L -22,90 Z" fill="#050403" />
          </g>

          {/* Tokoh 3 (Jenderal Kanan Menatap dengan Ketegangan) */}
          <g transform="translate(840, 1420)" opacity="0.9">
            <circle cx="0" cy="-110" r="18" fill="#070605" />
            <path d="M -15,-108 Q 0,-130 15,-108 Z" fill="#070605" />
            <path d="M -25,-90 L 25,-90 L 30,80 L -32,80 Z" fill="#050403" />
          </g>

          {/* Tokoh 4 (Pengawal Tombak di Sisi Kanan) */}
          <g transform="translate(940, 1400)" opacity="0.8">
            <line x1="-20" y1="90" x2="-20" y2="-220" stroke="#251B12" strokeWidth="5" />
            <polygon points="-23,-220 -17,-220 -20,-260" fill="#6B5033" />
            <circle cx="0" cy="-100" r="16" fill="#060504" />
            <path d="M -20,-82 L 20,-82 L 22,90 L -24,90 Z" fill="#050403" />
          </g>
        </svg>

        {/* 2. Obor Ruang Takhta di Kolom Sisi Luar */}
        <TorchFlame x={170} y={960} scale={1.0} phaseOffset={1.2} glowRadius={350} />
        <TorchFlame x={910} y={960} scale={1.0} phaseOffset={3.8} glowRadius={350} />

        {/* 3. Partikel Debu Midground Melayang Melintasi Berkas Cahaya Takhta */}
        <DustParticles count={32} depthLayer="midground" />

        {/* 4. Vignette Sinematik Dramatis */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 68%, transparent 40%, rgba(5, 7, 10, 0.75) 85%, #05070A 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

