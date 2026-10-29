import React from 'react';
import { Composition, Series } from 'remotion';
import { OpeningScene } from './scenes/OpeningScene';
import { EmpireWithoutKingScene } from './scenes/EmpireWithoutKingScene';
import { EmpireDividedMapScene } from './scenes/EmpireDividedMapScene';
import { SuccessionQuestionScene } from './scenes/SuccessionQuestionScene';
import { VIDEO_CONFIG } from './theme/tokens';

type Props = {};

/**
 * Komposisi Gabungan Teaser (Scene 1 + 2 + 3 + 4: 40 Detik / 1200 Frame)
 * Menggunakan Remotion Series untuk memastikan transisi kontinu tanpa gap
 * dan perhitungan frame lokal yang independen dan deterministik.
 */
export const CombinedTeaser: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: Opening Babilonia (0 - 8s / 240 frame) */}
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene1DurationFrames}>
        <OpeningScene />
      </Series.Sequence>

      {/* Scene 2: The Empire Without Its King (8 - 18s / 300 frame) */}
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene2DurationFrames}>
        <EmpireWithoutKingScene />
      </Series.Sequence>

      {/* Scene 3: The Empire Divided Map (18 - 30s / 360 frame) */}
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene3DurationFrames}>
        <EmpireDividedMapScene />
      </Series.Sequence>

      {/* Scene 4: Who Will Inherit the Empire? (30 - 40s / 300 frame) */}
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene4DurationFrames}>
        <SuccessionQuestionScene />
      </Series.Sequence>
    </Series>
  );
};

// 1. Komposisi Utama Teaser Gabungan (40 Detik: Scene 1 + 2 + 3 + 4)
export const TakhtaKosongTeaserComposition: React.FC = () => {
  return (
    <Composition
      id="TakhtaKosongTeaser"
      component={CombinedTeaser}
      durationInFrames={VIDEO_CONFIG.preview40sDurationFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};

// 2. Komposisi Independen Adegan 1 (Opening Scene — 8 Detik / 240 Frame)
export const OpeningSceneComposition: React.FC = () => {
  return (
    <Composition
      id="OpeningScene"
      component={OpeningScene}
      durationInFrames={VIDEO_CONFIG.scene1DurationFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};

// 3. Komposisi Independen Adegan 2 (The Empire Without Its King — 10 Detik / 300 Frame)
export const Scene2EmpireWithoutKingComposition: React.FC = () => {
  return (
    <Composition
      id="Scene2EmpireWithoutKing"
      component={EmpireWithoutKingScene}
      durationInFrames={VIDEO_CONFIG.scene2DurationFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};

// 4. Komposisi Independen Adegan 3 (The Empire Divided Map — 12 Detik / 360 Frame)
export const Scene3EmpireDividedComposition: React.FC = () => {
  return (
    <Composition
      id="Scene3EmpireDivided"
      component={EmpireDividedMapScene}
      durationInFrames={VIDEO_CONFIG.scene3DurationFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};

// 5. Komposisi Independen Adegan 4 (Who Will Inherit the Empire? — 10 Detik / 300 Frame)
export const Scene4SuccessionQuestionComposition: React.FC = () => {
  return (
    <Composition
      id="Scene4SuccessionQuestion"
      component={SuccessionQuestionScene}
      durationInFrames={VIDEO_CONFIG.scene4DurationFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};

// 6. Komposisi Template Bawaan (Dipertahankan untuk kontinuitas)
export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60}
      fps={30}
      width={1280}
      height={720}
    />
  );
};

export const MyComponent: React.FC<Props> = () => {
  return null;
};
