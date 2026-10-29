/**
 * Design Tokens untuk JEJAK PERADABAN — Episode 1: Takhta yang Kosong
 * Mengacu pada panduan warna dan tipografi di AGENTS.md & CHARACTER_BIBLE.md
 */

export const THEME_COLORS = {
  // Shadow & Background
  obsidianBlack: '#05070A',
  deepCharcoal: '#0C0A09',
  darkSlate: '#151311',
  wallShadow: '#1A1613',

  // Ancient Architecture & Desert
  sandOchre: '#C29B38',
  mudbrickBase: '#2E2216',
  mudbrickMid: '#443221',
  mudbrickHighlight: '#684E33',
  bronzeAccent: '#9E6D38',
  warmBronze: '#B88243',

  // Night Sky & Royalty
  lapisDeep: '#0D1B2A',
  lapisDesaturated: '#1B2A3E',
  lapisHighlight: '#2A4365',
  royalCrimson: '#42151D',
  royalPurple: '#2A1325',
  goldEmbroidery: '#D4AF37',

  // Torch & Fire Glow
  torchCore: '#FFF7E6',
  torchInnerGlow: '#FDBA74',
  torchFlame: '#F59E0B',
  torchAmber: '#D97706',
  torchDeepGlow: 'rgba(217, 119, 6, 0.25)',

  // Typography & Elements
  parchmentCream: '#F4E8C1',
  mutedCream: '#D6C8A5',
  fadedGold: '#C5A059',

  // Cartography & Ancient Map (Scene 3)
  mapParchment: '#17120C',
  mapParchmentLight: '#261B12',
  mapSeaDeep: '#090D13',
  mapSeaCoastline: '#182535',
  mapRiver: '#283E58',
  mapEmpireWash: 'rgba(194, 155, 56, 0.16)',
  mapEmpireGlow: 'rgba(212, 175, 55, 0.35)',
  mapBorderGold: '#C5A059',
  mapTensionLine: '#9B3322',
} as const;

export const TYPOGRAPHY = {
  fontFamilySerif: '"Cinzel", "Times New Roman", "Baskerville", Georgia, serif',
  fontFamilySans: '"Trajan Pro", "Cinzel Decorative", "Montserrat", "Cinzel", sans-serif',
} as const;

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  scene1DurationFrames: 240, // 8 detik
  scene2DurationFrames: 300, // 10 detik
  scene3DurationFrames: 360, // 12 detik
  scene4DurationFrames: 300, // 10 detik
  preview18sDurationFrames: 540, // 18 detik (Scene 1 + 2)
  preview30sDurationFrames: 900, // 30 detik (Scene 1 + 2 + 3)
  preview40sDurationFrames: 1200, // 40 detik (Scene 1 + 2 + 3 + 4)
  totalDurationFrames: 1350, // 45 detik
} as const;
