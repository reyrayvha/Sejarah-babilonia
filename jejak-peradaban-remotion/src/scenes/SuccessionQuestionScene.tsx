import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME_COLORS } from '../theme/tokens';
import { ThroneVacuumVisual } from '../components/scene4/ThroneVacuumVisual';
import { SuccessionQuestionText } from '../components/scene4/SuccessionQuestionText';
import { DustParticles } from '../components/DustParticles';
import { TorchFlame } from '../components/TorchFlame';

/**
 * Scene 4: Who Will Inherit the Empire? (300 frame / 10 detik)
 * Mengubah ketidakpastian sejarah pasca mangkatnya Alexander menjadi satu pertanyaan sentral:
 * “Siapa yang akan mewarisi imperium ini?”
 *
 * Struktur Rangkaian Waktu:
 * - Frame 0 - 90 (30 - 33s): Transisi dari peta Babilonia ke takhta yang kosong.
 * - Frame 90 - 180 (33 - 36s): Penyerapan visual kekosongan kekuasaan (takhta tanpa raja).
 * - Frame 180 - 270 (36 - 39s): Penyingkapan pertanyaan utama dengan tipografi berkontras tinggi.
 * - Frame 270 - 300 (39 - 40s): Antisipasi & penggelapan halus menuju Title Card penutup (Scene 5).
 */
export const SuccessionQuestionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Transisi Masuk dari Scene 3 Peta Pergamum (Frame 0 - 25)
  const sceneEntryFade = interpolate(frame, [0, 25], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Transisi Keluar menuju Scene 5 Title Card (Frame 280 - 300)
  const sceneExitFade = interpolate(frame, [280, 300], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Efek Residu Peta Babilonia Menghilang Perlahan (Frame 0 - 55)
  // Menghubungkan titik Babilonia dari peta Scene 3 langsung ke takhta di istana Babilonia
  const mapGhostOpacity = interpolate(frame, [0, 45], [0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Gerakan Kamera Sinematik (Master Slow Push-in khidmat & berbobot)
  const cameraScale = interpolate(frame, [0, 300], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraPanY = interpolate(frame, [0, 300], [0, -18], {
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
      {/* Kontainer Kamera Transformasi Dinamis */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraPanY}px)`,
          transformOrigin: '50% 65%',
        }}
      >
        {/* Visual Takhta yang Kosong & Berkas Cahaya Ethereal */}
        <ThroneVacuumVisual />

        {/* Obor Dinding Pilar Luar (Pencahayaan Samping yang Tenang & Dingin) */}
        <TorchFlame x={135} y={1150} scale={0.8} phaseOffset={0.7} glowRadius={280} />
        <TorchFlame x={945} y={1150} scale={0.8} phaseOffset={3.2} glowRadius={280} />

        {/* Partikel Debu Midground Melayang Melintasi Berkas Cahaya Takhta */}
        <DustParticles count={28} depthLayer="midground" />
      </div>

      {/* Residu Bayangan Peta Scene 3 (Menciptakan Transisi Konseptual yang Mulus) */}
      {mapGhostOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: mapGhostOpacity,
            background:
              'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.25) 0%, rgba(194, 155, 56, 0.08) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tipografi Pertanyaan Utama: “Siapa yang akan mewarisi imperium ini?” */}
      <SuccessionQuestionText />

      {/* Vignette Sinematik Dramatis untuk Memperkuat Fokus Vertikal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 55%, transparent 45%, rgba(4, 5, 8, 0.7) 80%, #030406 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tabir Transisi Masuk dari Scene 3 */}
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

      {/* Tabir Transisi Keluar menuju Scene 5 */}
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
