import React from 'react';
import {
  TakhtaKosongTeaserComposition,
  OpeningSceneComposition,
  Scene2EmpireWithoutKingComposition,
  MyComposition,
} from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Teaser Gabungan (Scene 1 + Scene 2: 18 Detik / 540 Frame) */}
      <TakhtaKosongTeaserComposition />

      {/* Komposisi Independen per Adegan untuk Preview Terfokus */}
      <OpeningSceneComposition />
      <Scene2EmpireWithoutKingComposition />

      {/* Komposisi Template Bawaan */}
      <MyComposition />
    </>
  );
};
