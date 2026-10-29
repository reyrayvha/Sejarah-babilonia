import React from 'react';
import {
  TakhtaKosongTeaserComposition,
  OpeningSceneComposition,
  Scene2EmpireWithoutKingComposition,
  Scene3EmpireDividedComposition,
  Scene4SuccessionQuestionComposition,
  MyComposition,
} from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Teaser Gabungan (Scene 1 + 2 + 3 + 4: 40 Detik / 1200 Frame) */}
      <TakhtaKosongTeaserComposition />

      {/* Komposisi Independen per Adegan untuk Preview Terfokus */}
      <OpeningSceneComposition />
      <Scene2EmpireWithoutKingComposition />
      <Scene3EmpireDividedComposition />
      <Scene4SuccessionQuestionComposition />

      {/* Komposisi Template Bawaan */}
      <MyComposition />
    </>
  );
};
