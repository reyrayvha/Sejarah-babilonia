import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../../theme/tokens';

/**
 * Visual Takhta yang Kosong (The Vacant Throne & Power Vacuum)
 * Komposisi monumental berpusat pada takhta kerajaan Babilonia yang kosong,
 * disorot oleh berkas cahaya dramatis dari atas dengan pilar-pilar raksasa di dalam bayangan.
 */
export const ThroneVacuumVisual: React.FC = () => {
  const frame = useCurrentFrame();

  // Fluktuasi cahaya berkas lembut (volumetric light beam)
  const beamPulse =
    0.88 +
    0.07 * Math.sin(frame * 0.22) +
    0.04 * Math.sin(frame * 0.55 + 1.2) +
    0.02 * Math.cos(frame * 1.1);


  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Latar Belakang Kegelapan Aula Istana Babilonia */}
        <radialGradient id="vacuumHallDark" cx="50%" cy="58%" r="65%">
          <stop offset="0%" stopColor="#17120D" />
          <stop offset="45%" stopColor="#0D0B08" />
          <stop offset="85%" stopColor="#05070A" />
        </radialGradient>

        {/* Berkas Cahaya Ethereal Menembus Kegelapan (Volumetric Light Shaft) */}
        <linearGradient id="etherealBeamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="rgba(244, 232, 193, 0.42)" />
          <stop offset="25%" stopColor="rgba(212, 175, 55, 0.28)" />
          <stop offset="65%" stopColor="rgba(194, 155, 56, 0.12)" />
          <stop offset="90%" stopColor="rgba(158, 109, 56, 0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Pendaran Cahaya di Permukaan Takhta */}
        <radialGradient id="seatGlowRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 247, 230, 0.5)" />
          <stop offset="40%" stopColor="rgba(245, 158, 11, 0.25)" />
          <stop offset="80%" stopColor="rgba(194, 155, 56, 0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Gradien Takhta Emas & Perunggu Kuno */}
        <linearGradient id="monumentalThroneGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6E4A1D" />
          <stop offset="30%" stopColor="#C59E4E" />
          <stop offset="50%" stopColor="#F5D78E" />
          <stop offset="70%" stopColor="#B38A3C" />
          <stop offset="100%" stopColor="#5E3E16" />
        </linearGradient>

        {/* Gradien Undakan Takhta Batu */}
        <linearGradient id="stoneDaisDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D231A" />
          <stop offset="50%" stopColor="#1B1510" />
          <stop offset="100%" stopColor="#0E0B08" />
        </linearGradient>

        {/* Kain Sutra Jubah Kerajaan Tersampir Kosong (Vacant Royal Mantle) */}
        <linearGradient id="vacantMantleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A1521" />
          <stop offset="50%" stopColor="#2A1325" />
          <stop offset="100%" stopColor="#120810" />
        </linearGradient>
      </defs>

      {/* 1. Latar Belakang Kegelapan Pekat Aula */}
      <rect x="0" y="0" width="1080" height="1920" fill="url(#vacuumHallDark)" />

      {/* 2. Pilar-Pilar Raksasa Kuno di Sisi Kiri & Kanan (Siluet Monolitik) */}
      {/* Pilar Jauh Kiri */}
      <polygon points="40,0 180,0 150,1920 10,1920" fill="#0A0806" />
      {/* Pilar Jauh Kanan */}
      <polygon points="1040,0 900,0 930,1920 1070,1920" fill="#0A0806" />

      {/* Pilar Tengah Kiri */}
      <polygon points="160,0 290,0 250,1750 120,1750" fill="#110E0A" />
      <line x1="225" y1="200" x2="185" y2="1750" stroke="#1F1812" strokeWidth="2.5" />

      {/* Pilar Tengah Kanan */}
      <polygon points="920,0 790,0 830,1750 960,1750" fill="#110E0A" />
      <line x1="855" y1="200" x2="895" y2="1750" stroke="#1F1812" strokeWidth="2.5" />

      {/* Lengkungan Kuno di Bagian Atas Aula */}
      <path
        d="M 120,1350 Q 540,550 960,1350"
        fill="none"
        stroke="#16120D"
        strokeWidth="20"
      />
      <path
        d="M 180,1380 Q 540,680 900,1380"
        fill="none"
        stroke="#1C1610"
        strokeWidth="12"
      />

      {/* 3. Lantai Marmer Hitam Istana */}
      <polygon points="0,1920 1080,1920 860,1350 220,1350" fill="#070605" />
      <line x1="220" y1="1350" x2="0" y2="1920" stroke="#18130E" strokeWidth="2" />
      <line x1="860" y1="1350" x2="1080" y2="1920" stroke="#18130E" strokeWidth="2" />

      {/* 4. BERKAS CAHAYA ETHEREAL DARI ATAS KE TAKHTA KOSONG */}
      <polygon
        points="540,60 360,1480 720,1480"
        fill="url(#etherealBeamGrad)"
        opacity={beamPulse}
        filter="blur(18px)"
      />
      {/* Inti Berkas Lebih Terang di Tengah */}
      <polygon
        points="540,80 430,1440 650,1440"
        fill="url(#etherealBeamGrad)"
        opacity={beamPulse * 0.85}
        filter="blur(8px)"
      />

      {/* 5. UNDAKAN BATU TAKHTA BERTINGKAT TIGA (The Dais) */}
      {/* Tingkat 1 (Dasar) */}
      <polygon points="260,1480 820,1480 880,1545 200,1545" fill="url(#stoneDaisDark)" stroke="#3D2E20" strokeWidth="2" />
      {/* Tingkat 2 */}
      <polygon points="310,1425 770,1425 810,1480 270,1480" fill="url(#stoneDaisDark)" stroke="#4A3827" strokeWidth="2" />
      {/* Tingkat 3 (Platform Utama) */}
      <polygon points="360,1370 720,1370 755,1425 325,1425" fill="url(#stoneDaisDark)" stroke="#5E4733" strokeWidth="2.5" />

      {/* Pendaran Cahaya di Permukaan Undakan Takhta */}
      <ellipse cx="540" cy="1395" rx="180" ry="40" fill="url(#seatGlowRadial)" opacity={beamPulse} />

      {/* 6. TAKHTA KERAJAAN YANG KOSONG (MONUMENTAL VACANT THRONE) */}
      <g transform="translate(540, 1310)">
        {/* Bayangan Pekat di Bawah Takhta */}
        <ellipse cx="0" cy="50" rx="120" ry="24" fill="#040302" opacity="0.9" />

        {/* Sandaran Punggung Takhta Monumental Tinggi */}
        <path
          d="M -70,-180 Q 0,-230 70,-180 L 65,30 L -65,30 Z"
          fill="url(#monumentalThroneGold)"
          stroke="#F5D78E"
          strokeWidth="4"
        />

        {/* Ornamen Puncak Takhta — Mahkota Surya & Singa Babilonia */}
        <polygon points="-70,-180 -55,-215 -40,-185" fill="#FCE9AA" />
        <polygon points="70,-180 55,-215 40,-185" fill="#FCE9AA" />
        <polygon points="-16,-225 0,-255 16,-225" fill="#FFF2C6" />

        {/* Ukiran Relief Dalam Sandaran Takhta */}
        <path
          d="M -45,-155 Q 0,-195 45,-155 L 42,-20 L -42,-20 Z"
          fill="#1C140B"
          stroke="#C59E4E"
          strokeWidth="2.5"
        />
        {/* Lambang Surya 8 Penjuru Terukir di Sandaran */}
        <circle cx="0" cy="-90" r="22" fill="#382613" stroke="#F5D78E" strokeWidth="2" />
        <circle cx="0" cy="-90" r="10" fill="#F5D78E" />

        {/* Kaki Takhta Berukir Cakar Singa Kuno (Lion Paw Legs) */}
        <rect x="-85" y="25" width="22" height="42" fill="#8C5E24" stroke="#F5D78E" strokeWidth="1.5" rx="4" />
        <rect x="63" y="25" width="22" height="42" fill="#8C5E24" stroke="#F5D78E" strokeWidth="1.5" rx="4" />

        {/* Bantalan & Alas Duduk Takhta */}
        <rect x="-90" y="10" width="180" height="28" fill="#A87733" stroke="#F5D78E" strokeWidth="3" rx="5" />

        {/* Sandaran Lengan Berukir Kepala Singa Emas */}
        <rect x="-96" y="-45" width="20" height="60" fill="#B5863D" stroke="#D4AF37" strokeWidth="2.5" rx="3" />
        <circle cx="-86" cy="-48" r="13" fill="#FCE9AA" stroke="#9A6D2E" strokeWidth="1.5" />
        <rect x="76" y="-45" width="20" height="60" fill="#B5863D" stroke="#D4AF37" strokeWidth="2.5" rx="3" />
        <circle cx="86" cy="-48" r="13" fill="#FCE9AA" stroke="#9A6D2E" strokeWidth="1.5" />

        {/* KAIN JUBAH KEKELASAN TERSAMPIR KOSONG — TANPA RAJA (The Vacant Royal Mantle) */}
        {/* Melambangkan kepedihan & kekosongan kekuasaan */}
        <path
          d="M -45,-75 Q 20,-60 55,-25 L 60,48 Q 25,56 -25,52 L -60,20 Z"
          fill="url(#vacantMantleGrad)"
          stroke="#7E1C30"
          strokeWidth="2"
        />
        {/* Tepi Sulaman Emas Berpendar Lembut */}
        <path
          d="M 55,-25 L 60,48 Q 25,56 -25,52"
          fill="none"
          stroke={THEME_COLORS.goldEmbroidery}
          strokeWidth="2.5"
          strokeDasharray="5 2.5"
          opacity="0.9"
        />

        {/* Sorotan Cahaya Langsung pada Alas Takhta yang Kosong */}
        <ellipse cx="0" cy="18" rx="60" ry="14" fill="#FFF7E6" opacity={0.35 * beamPulse} filter="blur(4px)" />
      </g>
    </svg>
  );
};
