import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS, TYPOGRAPHY } from '../theme/tokens';

/**
 * Peta Sejarah Sinematik Kawasan Imperium Alexander Agung (323 SM)
 * Mencakup Mediterania Timur, Makedonia/Yunani, Mesir, Mesopotamia, Persia, hingga Lembah Indus.
 * Sistem koordinat kanvas: 1800 x 1200 px.
 * Koordinat Babilonia: (780, 640)
 */

interface HistoricalMapSvgProps {
  empireRevealProgress: number; // 0 (tersembunyi) hingga 1 (seluruh imperium bersinar)
  tensionProgress: number;      // 0 hingga 1 (garis retakan ketegangan Diadochi)
  babylonFocusProgress: number; // 0 hingga 1 (penanda Babilonia aktif)
}

export const HistoricalMapSvg: React.FC<HistoricalMapSvgProps> = ({
  empireRevealProgress,
  tensionProgress,
  babylonFocusProgress,
}) => {
  const frame = useCurrentFrame();

  // Denyut halus pada penanda Babilonia
  const markerPulse = 1.0 + 0.12 * Math.sin(frame * 0.15);
  const ringScale = interpolate(
    (frame * 0.05) % 1,
    [0, 1],
    [1.0, 2.2]
  );
  const ringOpacity = interpolate(
    (frame * 0.05) % 1,
    [0, 0.7, 1],
    [0.8, 0.3, 0]
  );

  return (
    <svg
      width="1800"
      height="1200"
      viewBox="0 0 1800 1200"
      style={{
        width: '1800px',
        height: '1200px',
        overflow: 'visible',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85))',
      }}
    >
      <defs>
        {/* Tekstur Pergamum Kuno Dasar (Aged Parchment Landmass) */}
        <linearGradient id="parchmentLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1710" />
          <stop offset="30%" stopColor="#2A1F15" />
          <stop offset="65%" stopColor="#221A12" />
          <stop offset="100%" stopColor="#18120B" />
        </linearGradient>

        {/* Gradien Perairan Kuno Gelap (Lapis Lazuli / Dark Sea) */}
        <linearGradient id="ancientSeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B1017" />
          <stop offset="50%" stopColor="#0E1622" />
          <stop offset="100%" stopColor="#070B10" />
        </linearGradient>

        {/* Gradien Wilayah Taklukan Alexander (Imperial Gold/Amber Wash) */}
        <radialGradient id="empireWashRadial" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(212, 175, 55, 0.28)" />
          <stop offset="45%" stopColor="rgba(194, 155, 56, 0.18)" />
          <stop offset="75%" stopColor="rgba(158, 109, 56, 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Pendaran Garis Batas Imperium */}
        <linearGradient id="empireBorderGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A88438" />
          <stop offset="50%" stopColor="#F5D78E" />
          <stop offset="100%" stopColor="#B38A3C" />
        </linearGradient>

        {/* Filter Glow Halus untuk Garis Batas & Penanda */}
        <filter id="cartoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ========================================================
          1. LAUTAN & PERAIRAN UTAMA KAWASAN KUNO (Water Bodies)
          ======================================================== */}
      {/* Laut Mediterania (Mediterania Timur, Aegea, Levant, Delta Nil) */}
      <path
        d={`
          M 0,320
          L 190,320
          Q 250,380 230,460
          Q 280,500 240,560
          Q 320,530 350,470
          Q 400,520 440,490
          Q 480,510 520,490
          Q 560,510 580,580
          L 580,690
          Q 520,710 470,720
          Q 430,730 400,770
          L 340,780
          L 0,780
          Z
        `}
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2.5"
      />

      {/* Garis Pantai Kontur Pesisir (Coastal Bathymetric Ripples khas Peta Kuno) */}
      <path
        d="M 230,470 Q 290,510 250,570 Q 330,540 360,480 Q 410,530 450,500 L 570,590 L 570,680 Q 510,700 460,710"
        fill="none"
        stroke="#1E2F46"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        opacity="0.6"
      />

      {/* Laut Hitam (Pontus Euxinus) */}
      <path
        d="M 360,250 Q 480,210 620,240 Q 690,290 640,340 Q 510,360 410,330 Q 350,300 360,250 Z"
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2"
      />

      {/* Laut Kaspia (Hyrcanian Sea) */}
      <path
        d="M 860,210 Q 940,190 970,260 Q 990,380 950,460 Q 900,470 870,410 Q 840,320 860,210 Z"
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2"
      />

      {/* Laut Merah (Sinus Arabicus) */}
      <path
        d="M 570,740 L 610,790 L 680,950 L 730,1150 L 670,1150 L 620,970 L 550,810 Z"
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2"
      />

      {/* Teluk Persia (Sinus Persicus) */}
      <path
        d="M 870,760 Q 940,790 1010,850 Q 1090,920 1150,910 Q 1120,970 1020,940 Q 930,880 850,800 Z"
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2.5"
      />

      {/* Laut Arab / Samudra Hindia di Tenggara */}
      <path
        d="M 1250,1020 Q 1400,980 1560,940 L 1800,940 L 1800,1200 L 1200,1200 Z"
        fill="url(#ancientSeaGrad)"
        stroke={THEME_COLORS.mapSeaCoastline}
        strokeWidth="2"
      />

      {/* ========================================================
          2. SUNGAI-SUNGAI PURBA PENOPANG PERADABAN (Ancient Rivers)
          ======================================================== */}
      {/* Sungai Nil (Mesir) */}
      <path
        d="M 500,720 Q 510,780 490,850 Q 510,940 480,1060"
        fill="none"
        stroke={THEME_COLORS.mapRiver}
        strokeWidth="2.8"
      />
      {/* Delta Nil (Cabang sungai delta) */}
      <path d="M 470,720 Q 490,750 500,770 M 520,720 Q 510,750 500,770" fill="none" stroke={THEME_COLORS.mapRiver} strokeWidth="1.8" />

      {/* SUNGAI EUFRAT (EUPHRATES) — Melintasi Babilonia */}
      <path
        d="M 580,380 Q 610,430 650,480 Q 710,540 780,640 Q 820,700 870,760"
        fill="none"
        stroke="#3A557A"
        strokeWidth="3.2"
        filter="drop-shadow(0 0 2px rgba(42,63,90,0.5))"
      />

      {/* SUNGAI TIGRIS — Sejajar Eufrat di Mesopotamia */}
      <path
        d="M 680,360 Q 710,430 750,490 Q 790,560 830,650 Q 855,705 870,760"
        fill="none"
        stroke="#3A557A"
        strokeWidth="3.0"
        filter="drop-shadow(0 0 2px rgba(42,63,90,0.5))"
      />

      {/* Sungai Indus di Ujung Timur (Batas Penaklukan Alexander) */}
      <path
        d="M 1520,440 Q 1480,550 1510,680 Q 1470,790 1490,950"
        fill="none"
        stroke={THEME_COLORS.mapRiver}
        strokeWidth="3"
      />
      {/* 5 Anak Sungai Punjab */}
      <path d="M 1430,490 Q 1480,520 1500,560 M 1410,530 Q 1460,560 1490,600" fill="none" stroke={THEME_COLORS.mapRiver} strokeWidth="1.6" />

      {/* ========================================================
          3. PEGUNUNGAN & TOPOGRAFI KARTOGRAFI KLASIK (Mountain Ridges)
          ======================================================== */}
      {/* Pegunungan Taurus & Zagros (Anatolia hingga Persia) */}
      <g stroke="#3D2E1F" strokeWidth="1.5" fill="#1C150E" opacity="0.75">
        {/* Hachures Pegunungan Taurus */}
        <polygon points="460,470 475,445 490,470" />
        <polygon points="485,472 500,447 515,472" />
        <polygon points="510,468 525,442 540,468" />
        <polygon points="535,470 550,444 565,470" />

        {/* Hachures Pegunungan Zagros (Di timur Mesopotamia) */}
        <polygon points="760,480 775,455 790,480" />
        <polygon points="785,510 800,482 815,510" />
        <polygon points="810,545 825,518 840,545" />
        <polygon points="835,585 850,558 865,585" />
        <polygon points="860,625 875,598 890,625" />
        <polygon points="885,670 900,642 915,670" />

        {/* Pegunungan Hindu Kush di Timur Jauh */}
        <polygon points="1340,460 1360,425 1380,460" />
        <polygon points="1375,470 1395,435 1415,470" />
        <polygon points="1410,475 1430,440 1450,475" />
      </g>

      {/* ========================================================
          4. WILAYAH IMPERIUM ALEXANDER AGUNG PADA 323 SM
          (Shaded Imperial Extent — Tanpa Batas Negara Modern)
          ======================================================== */}
      {empireRevealProgress > 0 && (
        <g opacity={empireRevealProgress}>
          {/* Poligon Hamparan Imperium dari Makedonia hingga Indus */}
          <path
            d={`
              M 200,380
              Q 260,330 360,340
              Q 460,350 560,370
              Q 680,350 820,380
              Q 940,440 1080,400
              Q 1220,360 1380,390
              Q 1460,420 1540,480
              Q 1560,650 1520,840
              Q 1420,920 1280,880
              Q 1180,820 1060,840
              Q 950,780 860,740
              Q 780,680 720,680
              Q 650,680 580,720
              Q 530,760 480,940
              Q 430,850 460,720
              Q 400,600 340,560
              Q 260,550 210,480
              Z
            `}
            fill="url(#empireWashRadial)"
            stroke="url(#empireBorderGold)"
            strokeWidth="3.2"
            strokeDasharray="14 7"
            filter="url(#cartoGlow)"
          />

          {/* Label Wilayah Kuno Samar / Understated Watermark Text */}
          <g
            fontFamily={TYPOGRAPHY.fontFamilySerif}
            fill={THEME_COLORS.fadedGold}
            opacity={0.45 * empireRevealProgress}
            letterSpacing="0.45em"
            fontSize="18px"
            textAnchor="middle"
          >
            <text x="260" y="420">MAKEDONIA</text>
            <text x="470" y="800">MESIR</text>
            <text x="760" y="560">MESOPOTAMIA</text>
            <text x="1050" y="660">PERSIA</text>
            <text x="1380" y="520">BAKTRIA</text>
          </g>
        </g>
      )}

      {/* ========================================================
          5. GARIS RETAKAN KETEGANGAN SUKSESI (Tension / Fracture Lines)
          Foreshadowing: Perebutan Kekuasaan Diadochi dari Pusat Babilonia
          ======================================================== */}
      {tensionProgress > 0 && (
        <g opacity={tensionProgress}>
          {/* Garis Fissure 1: Menuju Mesir (Ptolemaios) */}
          <path
            d="M 780,640 Q 640,660 510,750"
            fill="none"
            stroke={THEME_COLORS.mapTensionLine}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeDashoffset={interpolate(tensionProgress, [0, 1], [150, 0])}
            filter="url(#cartoGlow)"
          />

          {/* Garis Fissure 2: Menuju Makedonia / Yunani (Antipatros / Kassandros) */}
          <path
            d="M 780,640 Q 540,510 270,410"
            fill="none"
            stroke={THEME_COLORS.mapTensionLine}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeDashoffset={interpolate(tensionProgress, [0, 1], [180, 0])}
            filter="url(#cartoGlow)"
          />

          {/* Garis Fissure 3: Menuju Asia Kecil / Suriah (Antigonos / Perdikkas) */}
          <path
            d="M 780,640 Q 620,490 450,440"
            fill="none"
            stroke={THEME_COLORS.mapTensionLine}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeDashoffset={interpolate(tensionProgress, [0, 1], [140, 0])}
            filter="url(#cartoGlow)"
          />

          {/* Garis Fissure 4: Menuju Satrapi Timur / Persia (Seleukos) */}
          <path
            d="M 780,640 Q 1020,620 1320,530"
            fill="none"
            stroke={THEME_COLORS.mapTensionLine}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeDashoffset={interpolate(tensionProgress, [0, 1], [170, 0])}
            filter="url(#cartoGlow)"
          />
        </g>
      )}

      {/* ========================================================
          6. TITIK FOKUS UTAMA: BABILONIA (323 SM)
          Pusat kemangkatan Alexander Agung di antara Eufrat & Tigris
          ======================================================== */}
      {babylonFocusProgress > 0 && (
        <g transform="translate(780, 640)" opacity={babylonFocusProgress}>
          {/* Gelombang Denyut Konsentris (Radar / Ripple Pulse) */}
          <circle
            cx="0"
            cy="0"
            r={24 * ringScale}
            fill="none"
            stroke="#F5D78E"
            strokeWidth="2"
            opacity={ringOpacity}
          />

          {/* Lingkaran Luar Berpola Kompas Astrolabe */}
          <circle
            cx="0"
            cy="0"
            r={18 * markerPulse}
            fill="rgba(194, 155, 56, 0.2)"
            stroke="#D4AF37"
            strokeWidth="2.5"
            filter="url(#cartoGlow)"
          />
          <circle cx="0" cy="0" r="10" fill="#2E1C0F" stroke="#F5D78E" strokeWidth="2" />
          <circle cx="0" cy="0" r="4.5" fill="#FFF7E6" />

          {/* Garis Salib Bidik Kompas Kuno (Compass Crosshairs) */}
          <line x1="-28" y1="0" x2="-20" y2="0" stroke="#E5C77A" strokeWidth="2" />
          <line x1="20" y1="0" x2="28" y2="0" stroke="#E5C77A" strokeWidth="2" />
          <line x1="0" y1="-28" x2="0" y2="-20" stroke="#E5C77A" strokeWidth="2" />
          <line x1="0" y1="20" x2="0" y2="28" stroke="#E5C77A" strokeWidth="2" />

          {/* TIPOGRAFI HISTORIS ELEGAN MINIMAL: BABILONIA & 323 SM */}
          <g transform="translate(0, 48)">
            {/* Teks Kota */}
            <text
              x="0"
              y="0"
              fontFamily={TYPOGRAPHY.fontFamilySerif}
              fontSize="24px"
              fontWeight="700"
              fill={THEME_COLORS.parchmentCream}
              letterSpacing="0.32em"
              textAnchor="middle"
              filter="drop-shadow(0 2px 8px rgba(0,0,0,0.95))"
            >
              BABILONIA
            </text>

            {/* Garis Aksen Emas/Perunggu di Bawah Teks */}
            <line
              x1="-45"
              y1="10"
              x2="45"
              y2="10"
              stroke={THEME_COLORS.fadedGold}
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* Tahun Kematian Alexander */}
            <text
              x="0"
              y="32"
              fontFamily={TYPOGRAPHY.fontFamilySerif}
              fontSize="18px"
              fontWeight="600"
              fill={THEME_COLORS.sandOchre}
              letterSpacing="0.28em"
              textAnchor="middle"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.95))"
            >
              323 SM
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

