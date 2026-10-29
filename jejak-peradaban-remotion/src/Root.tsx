import React from 'react';
import {
  TakhtaKosongTeaserComposition,
  OpeningSceneComposition,
  Scene2EmpireWithoutKingComposition,
  Scene3EmpireDividedComposition,
  MyComposition,
} from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Teaser Gabungan (Scene 1 + 2 + 3: 30 Detik / 900 Frame) */}
      <TakhtaKosongTeaserComposition />

      {/* Komposisi Independen per Adegan untuk Preview Terfokus */}
      <OpeningSceneComposition />
      <Scene2EmpireWithoutKingComposition />
      <Scene3EmpireDividedComposition />

      {/* Komposisi Template Bawaan */}
      <MyComposition />
    </>
  );
};
