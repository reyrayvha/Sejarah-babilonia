import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../theme/tokens';
import { PalaceCorridorShot } from '../components/scene2/PalaceCorridorShot';
import { MilitaryDetailShot } from '../components/scene2/MilitaryDetailShot';
import { EmptyThroneShot } from '../components/scene2/EmptyThroneShot';

/**
 * Scene 2: The Empire Without Its King (300 frame / 10 detik)
 * Menggambarkan ketegangan militer, kekosongan kekuasaan, dan takhta kerajaan yang kosong
 * pasca mangkatnya Alexander Agung di Babilonia.
 *
 * Struktur Rangkaian Shot:
 * - Shot 2.1 (Frame 0 - 90): Transisi masuk, lorong istana, spanduk kerajaan lapis lazuli ditiup angin.
 * - Shot 2.2 (Frame 90 - 210): Close-up detail perisai perunggu berukir bintang Makedonia, helm, & tombak.
 * - Shot 2.3 (Frame 210 - 300): Sorotan cahaya ke takhta kosong berundak & siluet para penerus dalam keheningan tegang.
 */
export const EmpireWithoutKingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Transisi masuk Scene 2 (menyambung dari Scene 1 yang berakhir di frame 239)
  // Scene 1 ditutup dengan penggelapan halus di frame 215-240
  const sceneEntryFade = interpolate(frame, [0, 20], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transisi keluar Scene 2 menuju Scene 3 Peta Imperium (frame 285 - 300)
  const sceneExitFade = interpolate(frame, [285, 300], [0, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* Shot 2.1: Lorong Istana & Spanduk Kerajaan (Frame 0 - 90) */}
      {frame <= 95 && <PalaceCorridorShot />}

      {/* Shot 2.2: Detail Militer Perisai & Helm Perunggu (Frame 85 - 215) */}
      {frame >= 85 && frame <= 215 && <MilitaryDetailShot />}

      {/* Shot 2.3: Ruang Takhta Babilonia & Takhta yang Kosong (Frame 205 - 300) */}
      {frame >= 205 && <EmptyThroneShot />}

      {/* Tabir Transisi Masuk dari Scene 1 */}
      {sceneEntryFade > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: THEME_COLORS.obsidianBlack,
            opacity: sceneEntryFade,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tabir Transisi Keluar menuju Scene 3 */}
      {sceneExitFade > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: THEME_COLORS.obsidianBlack,
            opacity: sceneExitFade,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

