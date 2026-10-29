import React from 'react';

/**
 * Komponen Siluet Arsitektur Babilonia Kuno (Mesopotamia)
 * Dibagi menjadi 3 layer kedalaman:
 * 1. ZigguratBackground: Etemenanki (menara bertingkat berundak di kejauhan)
 * 2. PalaceMidground: Gerbang monumental berkubah, menara berpilar, & merlon berundak khas Ishtar
 * 3. ForegroundPillars: Pilar gerbang terdekat di sisi kiri & kanan sebagai framing sinematik
 */

// Helper untuk menghasilkan deretan merlon berundak (stepped crenellations khas Babilonia)
const SteppedMerlon: React.FC<{ x: number; y: number; width: number; height: number; fill: string }> = ({
  x,
  y,
  width,
  height,
  fill,
}) => {
  const stepW = width / 6;
  const stepH = height / 3;
  // Bentuk undakan 3 tingkat khas Babilonia
  const d = `
    M ${x},${y + height}
    L ${x},${y + height - stepH}
    L ${x + stepW},${y + height - stepH}
    L ${x + stepW},${y + height - stepH * 2}
    L ${x + stepW * 2},${y + height - stepH * 2}
    L ${x + stepW * 2},${y}
    L ${x + stepW * 4},${y}
    L ${x + stepW * 4},${y + height - stepH * 2}
    L ${x + stepW * 5},${y + height - stepH * 2}
    L ${x + stepW * 5},${y + height - stepH}
    L ${x + width},${y + height - stepH}
    L ${x + width},${y + height}
    Z
  `;
  return <path d={d} fill={fill} />;
};

// ==========================================
// 1. BACKGROUND: Ziggurat Kuno (Etemenanki)
// ==========================================
export const ZigguratBackgroundSvg: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 1080, height = 1920 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Gradien siluet ziggurat di kejauhan dengan kabut malam */}
        <linearGradient id="zigguratGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#141824" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#12131C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1E1712" stopOpacity="1" />
        </linearGradient>

        {/* Rim lighting lembut dari atas kanan (cahaya rembulan) */}
        <linearGradient id="zigguratRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E2838" stopOpacity="0.3" />
          <stop offset="90%" stopColor="#4A3F2C" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6C593C" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Siluet Menara Ziggurat 5 Tingkat (Ditempatkan di tengah-kiri latar, horizon y: 650-1200) */}
      <g opacity="0.92">
        {/* Kuil Puncak Ziggurat */}
        <rect x="475" y="720" width="130" height="60" fill="url(#zigguratGrad)" />
        <rect x="495" y="695" width="90" height="25" fill="url(#zigguratGrad)" />
        {/* Tangga/Ramp tengah menuju kuil */}
        <polygon points="535,695 545,695 550,780 530,780" fill="#0E121A" />

        {/* Tingkat 5 */}
        <polygon points="440,780 640,780 670,850 410,850" fill="url(#zigguratGrad)" />
        {/* Tingkat 4 */}
        <polygon points="380,850 700,850 735,930 345,930" fill="url(#zigguratGrad)" />
        {/* Tingkat 3 */}
        <polygon points="310,930 770,930 810,1020 270,1020" fill="url(#zigguratGrad)" />
        {/* Tingkat 2 */}
        <polygon points="230,1020 850,1020 895,1120 185,1120" fill="url(#zigguratGrad)" />
        {/* Tingkat 1 (Pondasi raksasa) */}
        <polygon points="140,1120 940,1120 990,1260 90,1260" fill="url(#zigguratGrad)" />

        {/* Garis batas antar undakan untuk memberi dimensi arsitektur kuno */}
        <line x1="440" y1="780" x2="640" y2="780" stroke="#252A36" strokeWidth="2" />
        <line x1="380" y1="850" x2="700" y2="850" stroke="#252A36" strokeWidth="2.5" />
        <line x1="310" y1="930" x2="770" y2="930" stroke="#2A2A33" strokeWidth="3" />
        <line x1="230" y1="1020" x2="850" y2="1020" stroke="#332B24" strokeWidth="3.5" />
        <line x1="140" y1="1120" x2="940" y2="1120" stroke="#382C1F" strokeWidth="4" />

        {/* Tangga Akses Monumental di lereng ziggurat */}
        <polygon points="515,780 565,780 590,1260 490,1260" fill="#0C0E14" opacity="0.8" />
        <line x1="540" y1="780" x2="540" y2="1260" stroke="#252422" strokeWidth="2" />

        {/* Tembok kota luar di horizon kiri & kanan */}
        <rect x="0" y="1180" width="220" height="200" fill="#13141A" />
        <rect x="860" y="1160" width="220" height="220" fill="#15151B" />
        {/* Menara jaga di kejauhan */}
        <rect x="40" y="1120" width="60" height="60" fill="#111218" />
        <rect x="980" y="1100" width="70" height="60" fill="#13131A" />
      </g>
    </svg>
  );
};

// ==========================================
// 2. MIDGROUND: Gerbang & Istana Kerajaan Babilonia
// ==========================================
export const PalaceMidgroundSvg: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 1080, height = 1920 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Gradien material batu bata lumpur (mudbrick) istana */}
        <linearGradient id="palaceWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#251E17" />
          <stop offset="40%" stopColor="#1C1612" />
          <stop offset="100%" stopColor="#0E0B09" />
        </linearGradient>

        {/* Gradien bayangan relung vertikal (fluting/buttress niches khas Mesopotamia) */}
        <linearGradient id="nicheShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A0807" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#1D1610" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0A0807" stopOpacity="0.9" />
        </linearGradient>

        {/* Gradien lengkungan gerbang utama (kedalaman lorong gelap istana) */}
        <radialGradient id="portalInterior" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#030303" />
          <stop offset="70%" stopColor="#070605" />
          <stop offset="100%" stopColor="#15110E" />
        </radialGradient>

        {/* Frieze relief band khas Babilonia (ornamen singa & naga sirrush bergaya geometris) */}
        <linearGradient id="friezeBand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3A2B1D" />
          <stop offset="50%" stopColor="#543E29" />
          <stop offset="100%" stopColor="#3A2B1D" />
        </linearGradient>
      </defs>

      {/* --- STRUKTUR DINDING UTAMA ISTANA (Tengah ke Bawah) --- */}
      <g>
        {/* Dinding Tirai Belakang (Curtain Wall) */}
        <rect x="120" y="1050" width="840" height="870" fill="url(#palaceWallGrad)" />

        {/* Merlon berundak di sepanjang dinding tirai belakang */}
        {Array.from({ length: 18 }).map((_, i) => (
          <SteppedMerlon
            key={`merlon-curtain-${i}`}
            x={130 + i * 46}
            y={1025}
            width={38}
            height={25}
            fill="#1E1712"
          />
        ))}

        {/* --- DUA MENARA PENGAPIT GERBANG RAKSASA (Gate Bastions) --- */}
        {/* Menara Pengapit Kiri (Bastion Kiri) */}
        <rect x="180" y="930" width="260" height="990" fill="#1C1611" stroke="#2E2319" strokeWidth="2" />
        {/* Menara Pengapit Kanan (Bastion Kanan) */}
        <rect x="640" y="930" width="260" height="990" fill="#1C1611" stroke="#2E2319" strokeWidth="2" />

        {/* Merlon di puncak Menara Kiri */}
        {Array.from({ length: 6 }).map((_, i) => (
          <SteppedMerlon
            key={`merlon-tower-l-${i}`}
            x={185 + i * 42}
            y={898}
            width={36}
            height={32}
            fill="#2A2016"
          />
        ))}

        {/* Merlon di puncak Menara Kanan */}
        {Array.from({ length: 6 }).map((_, i) => (
          <SteppedMerlon
            key={`merlon-tower-r-${i}`}
            x={645 + i * 42}
            y={898}
            width={36}
            height={32}
            fill="#2A2016"
          />
        ))}

        {/* Relung Vertikal Monumental (Vertical Niches) pada menara kiri */}
        <rect x="225" y="960" width="38" height="580" fill="url(#nicheShadow)" />
        <rect x="290" y="960" width="40" height="580" fill="url(#nicheShadow)" />
        <rect x="355" y="960" width="38" height="580" fill="url(#nicheShadow)" />

        {/* Relung Vertikal Monumental pada menara kanan */}
        <rect x="685" y="960" width="38" height="580" fill="url(#nicheShadow)" />
        <rect x="750" y="960" width="40" height="580" fill="url(#nicheShadow)" />
        <rect x="815" y="960" width="38" height="580" fill="url(#nicheShadow)" />

        {/* Pita Frieze Relief Ornamen Kerajaan (Horizontal Bands) */}
        <rect x="180" y="1120" width="260" height="24" fill="url(#friezeBand)" />
        <rect x="640" y="1120" width="260" height="24" fill="url(#friezeBand)" />
        <rect x="180" y="1320" width="260" height="20" fill="url(#friezeBand)" />
        <rect x="640" y="1320" width="260" height="20" fill="url(#friezeBand)" />

        {/* Detail ornamen geometris kecil pada pita relief */}
        {Array.from({ length: 7 }).map((_, i) => (
          <React.Fragment key={`frieze-deco-${i}`}>
            <rect x={195 + i * 35} y="1125" width="16" height="14" fill="#140F0A" />
            <rect x={655 + i * 35} y="1125" width="16" height="14" fill="#140F0A" />
          </React.Fragment>
        ))}

        {/* --- GERBANG MONUMENTAL BERKUBAH UTAMA (Grand Portal) --- */}
        {/* Dinding atas gerbang */}
        <rect x="440" y="1020" width="200" height="900" fill="#18130E" />

        {/* Merlon di puncak dinding gerbang tengah */}
        {Array.from({ length: 5 }).map((_, i) => (
          <SteppedMerlon
            key={`merlon-gate-center-${i}`}
            x={445 + i * 39}
            y={990}
            width={34}
            height={30}
            fill="#271E15"
          />
        ))}

        {/* Lengkungan Gerbang (Arch Gateway) Babilonia */}
        {/* Lingkup luar lengkungan gerbang dengan batu berpola */}
        <path
          d="M 440,1920 L 440,1360 A 100,100 0 0,1 640,1360 L 640,1920 Z"
          fill="#2C2117"
          stroke="#473624"
          strokeWidth="6"
        />
        {/* Lengkungan dalam (Lorong masuk istana menuju kegelapan tak berujung) */}
        <path
          d="M 465,1920 L 465,1380 A 75,75 0 0,1 615,1380 L 615,1920 Z"
          fill="url(#portalInterior)"
        />

        {/* Tangga Masuk Utama Istana Babilonia */}
        <polygon points="340,1920 740,1920 710,1860 370,1860" fill="#120E0A" />
        <line x1="340" y1="1880" x2="740" y2="1880" stroke="#221A13" strokeWidth="3" />
        <line x1="355" y1="1900" x2="725" y2="1900" stroke="#221A13" strokeWidth="3" />

        {/* Siluet Penjaga Tombak Anonim di depan Gerbang (Kekosongan & Ketegangan) */}
        {/* Penjaga Kiri */}
        <g opacity="0.85">
          <circle cx="430" cy="1580" r="9" fill="#080706" /> {/* Kepala berhelm runcing */}
          <path d="M 428,1570 L 432,1570 L 430,1560 Z" fill="#080706" /> {/* Helm runcing */}
          <path d="M 420,1590 L 440,1590 L 442,1680 L 418,1680 Z" fill="#080706" /> {/* Jubah */}
          <line x1="444" y1="1530" x2="444" y2="1685" stroke="#3A2D1F" strokeWidth="2.5" /> {/* Tombak */}
          <polygon points="441,1535 447,1535 444,1515" fill="#5A4732" /> {/* Mata tombak perunggu */}
        </g>

        {/* Penjaga Kanan */}
        <g opacity="0.85">
          <circle cx="650" cy="1580" r="9" fill="#080706" />
          <path d="M 648,1570 L 652,1570 L 650,1560 Z" fill="#080706" />
          <path d="M 640,1590 L 660,1590 L 662,1680 L 638,1680 Z" fill="#080706" />
          <line x1="636" y1="1530" x2="636" y2="1685" stroke="#3A2D1F" strokeWidth="2.5" />
          <polygon points="633,1535 639,1535 636,1515" fill="#5A4732" />
        </g>
      </g>
    </svg>
  );
};

// ==========================================
// 3. FOREGROUND: Kolom & Pilar Pembingkai Sinematik (Cinematic Framing)
// ==========================================
export const ForegroundPillarsSvg: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 1080, height = 1920 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Bayangan sangat pekat pada elemen foreground terdekat */}
        <linearGradient id="fgPillarLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#050403" />
          <stop offset="80%" stopColor="#0A0806" />
          <stop offset="100%" stopColor="#19130D" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="fgPillarRight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#050403" />
          <stop offset="80%" stopColor="#0A0806" />
          <stop offset="100%" stopColor="#19130D" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Kolom Gerbang Depan Sisi Kiri */}
      <polygon points="0,0 150,0 110,1920 0,1920" fill="url(#fgPillarLeft)" />
      {/* Garis tekstur batu kasar kuno pada pilar kiri */}
      <line x1="75" y1="200" x2="65" y2="1800" stroke="#0F0C09" strokeWidth="4" />
      <line x1="110" y1="400" x2="100" y2="1600" stroke="#17120C" strokeWidth="2" />

      {/* Kolom Gerbang Depan Sisi Kanan */}
      <polygon points="1080,0 930,0 970,1920 1080,1920" fill="url(#fgPillarRight)" />
      {/* Garis tekstur pilar kanan */}
      <line x1="1005" y1="200" x2="1015" y2="1800" stroke="#0F0C09" strokeWidth="4" />
      <line x1="970" y1="400" x2="980" y2="1600" stroke="#17120C" strokeWidth="2" />

      {/* Ambang Balok Atas Pembingkai (Architrave / Header Beams) */}
      <polygon points="0,0 1080,0 1080,90 850,70 230,70 0,90" fill="#060504" />
      <line x1="0" y1="75" x2="1080" y2="75" stroke="#1C160F" strokeWidth="3" />
    </svg>
  );
};
