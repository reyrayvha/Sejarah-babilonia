import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../theme/tokens';
import { ParchmentTexture } from '../components/ParchmentTexture';
import { HistoricalMapSvg } from '../components/HistoricalMapSvg';
import { DustParticles } from '../components/DustParticles';

/**
 * Scene 3: The Empire Divided (360 frame / 12 detik)
 * Peta sejarah sinematik yang memperlihatkan skala imperium Alexander Agung
 * pada 323 SM dan awal retakan suksesi dari titik pusat Babilonia.
 *
 * Garis Waktu:
 * - Frame 0 - 90 (18 - 21s): Transisi masuk dari Scene 2 ke lembaran pergamum kuno.
 * - Frame 90 - 210 (21 - 25s): Penyingkapan hamparan luas imperium dari Makedonia hingga Indus.
 * - Frame 210 - 300 (25 - 28s): Kamera bergerak mendekat dan mengunci fokus ke Babilonia (323 SM).
 * - Frame 300 - 360 (28 - 30s): Muncul garis-garis retakan ketegangan Diadochi & transisi ke Scene 4.
 */
export const EmpireDividedMapScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Transisi Masuk dari Scene 2 (Frame 0 - 30)
  const sceneEntryFade = interpolate(frame, [0, 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Transisi Keluar menuju Scene 4 (Frame 335 - 360)
  const sceneExitFade = interpolate(frame, [335, 360], [0, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Progres Penyingkapan Hamparan Imperium (Frame 90 - 180)
  const empireRevealProgress = interpolate(frame, [90, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Progres Fokus & Penanda Babilonia (Frame 210 - 250)
  const babylonFocusProgress = interpolate(frame, [210, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Progres Garis Retakan Ketegangan Suksesi (Frame 300 - 350)
  const tensionProgress = interpolate(frame, [300, 350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. Gerakan Kamera Sinematik (Pan & Push-in Bertahap)
  // - Phase 1 & 2: Pandangan luas imperium (scale: 1.08 -> 1.0)
  // - Phase 3 & 4: Zoom masuk halus menuju titik Babilonia (scale: 1.0 -> 1.45)
  const cameraScale = interpolate(
    frame,
    [0, 90, 200, 310, 360],
    [1.12, 1.05, 1.02, 1.45, 1.48],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Pergeseran kamera dari luas ke fokus Babilonia (Babilonia berada di x:780, y:640 pada SVG 1800x1200)
  const cameraPanX = interpolate(
    frame,
    [0, 100, 200, 310, 360],
    [-80, -20, 0, 120, 130],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const cameraPanY = interpolate(
    frame,
    [0, 100, 200, 310, 360],
    [-30, -10, 0, -40, -45],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

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
      {/* Lapisan Tekstur Pergamum & Cahaya Meja Perang */}
      <ParchmentTexture>
        {/* Kontainer Transformasi Kamera Sinematik */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '1800px',
            height: '1200px',
            transform: `translate(-50%, -50%) translate(${cameraPanX}px, ${cameraPanY}px) scale(${cameraScale})`,
            transformOrigin: '780px 640px', // Zoom berpusat di koordinat Babilonia
          }}
        >
          {/* Peta Vektor Sejarah Babilonia & Imperium Alexander */}
          <HistoricalMapSvg
            empireRevealProgress={empireRevealProgress}
            tensionProgress={tensionProgress}
            babylonFocusProgress={babylonFocusProgress}
          />
        </div>

        {/* Partikel Debu Midground Melayang Halus di Atas Permukaan Peta */}
        <DustParticles count={22} depthLayer="midground" />
      </ParchmentTexture>

      {/* Tabir Transisi Masuk dari Scene 2 */}
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

      {/* Tabir Transisi Keluar menuju Scene 4 */}
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
