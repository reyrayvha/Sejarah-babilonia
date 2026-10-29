import React from 'react';
import { Composition, Series } from 'remotion';
import { OpeningScene } from './scenes/OpeningScene';
import { EmpireWithoutKingScene } from './scenes/EmpireWithoutKingScene';
import { VIDEO_CONFIG } from './theme/tokens';

type Props = {};

/**
 * Komposisi Gabungan Teaser (Scene 1 + Scene 2: 18 Detik / 540 Frame)
 * Menggunakan Remotion Series untuk memastikan transisi kontinu tanpa gap
 * dan perhitungan frame lokal yang independen dan deterministik.
 */
export const CombinedTeaser: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene1DurationFrames}>
        <OpeningScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={VIDEO_CONFIG.scene2DurationFrames}>
        <EmpireWithoutKingScene />
      </Series.Sequence>
    </Series>
  );
};

// 1. Komposisi Utama Teaser Gabungan (18 Detik: Scene 1 + 2)
export const TakhtaKosongTeaserComposition: React.FC = () => {
  return (
    <Composition
      id="TakhtaKosongTeaser"
      component={CombinedTeaser}
      durationInFrames={VIDEO_CONFIG.preview18sDurationFrames}
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

// 4. Komposisi Template Bawaan (Dipertahankan untuk kontinuitas)
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
