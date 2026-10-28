import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../contsants/Colors';
import './WaveBackground.css';

export type WaveDirection = 'top' | 'bottom' | 'left' | 'right';

interface WaveBackgroundProps {
  variant?: 'dark' | 'light';
  hasIntro?: boolean;
  /** Bord sur lequel la bande ondulée est ancrée. Défaut : 'bottom' (comportement d'origine). */
  direction?: WaveDirection;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Construction du masque SVG de la vague, selon l'orientation        */
/*                                                                      */
/*  Les points sont définis dans un repère (along, cross) indépendant  */
/*  du sens final :                                                    */
/*    - along : position le long du bord qui se répète (0 → PERIOD)    */
/*    - cross : profondeur de la vague                                 */
/*              0         = côté "contenu" (bord ondulé visible)       */
/*              THICKNESS = côté "hors écran" (bord plat, invisible)   */
/*                                                                      */
/*  orientation 'horizontal' → along = X, cross = Y (bandes haut/bas)  */
/*  orientation 'vertical'   → along = Y, cross = X (bandes gauche/dr.)*/
/* ------------------------------------------------------------------ */


const THICKNESS = 50000; // épaisseur du ruban ondulé
const PERIOD = THICKNESS * 6;   // longueur d'un motif avant répétition
const WAVE_CENTER = THICKNESS / 2;
const LARGE_WAVE_AMPLITUDE = WAVE_CENTER * 0.8;

type Point = [number, number, 'c' | 'v'];
type Orientation = 'horizontal' | 'vertical';

const buildTilePath = (points: Point[], orientation: Orientation): string => {
  const toXY = (along: number, cross: number): [number, number] =>
    orientation === 'horizontal' ? [along, cross] : [cross, along];

  const [startX, startY] = toXY(points[0][0], points[0][1]);
  let d = `M ${startX},${startY}`;

  for (let i = 1; i < points.length; i++) {
    const [aPrev, cPrev] = points[i - 1];
    const [aCur, cCur] = points[i];
    const da = aCur - aPrev;
    const [cx0, cy0] = toXY(Math.round(aPrev + da / 3), cPrev);
    const [cx1, cy1] = toXY(Math.round(aCur - da / 3), cCur);
    const [x1, y1] = toXY(aCur, cCur);
    d += ` C ${cx0},${cy0} ${cx1},${cy1} ${x1},${y1}`;
  }

  const [endX, endY] = toXY(PERIOD, THICKNESS);
  const [closeX, closeY] = toXY(0, THICKNESS);
  return `${d} L ${endX},${endY} L ${closeX},${closeY} Z`;
};

const toMaskUrl = (path: string, orientation: Orientation): string => {
  const width = orientation === 'horizontal' ? PERIOD : THICKNESS;
  const height = orientation === 'horizontal' ? THICKNESS : PERIOD;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<path d="${path}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const buildWavePoints = (phase: number): Point[] => {
  const points: Point[] = [];
  const sampleCount = 49;

  for (let index = 0; index <= sampleCount; index++) {
    const along = (PERIOD * index) / sampleCount;
    const progress = along / PERIOD;
    const largeWave = Math.sin(progress * Math.PI * 2 + phase) * LARGE_WAVE_AMPLITUDE;
    // const smallWave = Math.sin(progress * Math.PI * 16 + phase * 1.8) * (30 + Math.sin(phase * 1.3) * 12);
    const smallWave = 0;
    const cross = WAVE_CENTER + largeWave + smallWave;
    points.push([along, cross, index % 2 === 0 ? 'v' : 'c']);
  }

  return points;
};

const buildAnimatedMask = (orientation: Orientation, phase: number): string =>
  toMaskUrl(buildTilePath(buildWavePoints(phase), orientation), orientation);

// "top"/"left" réutilisent respectivement la tuile de "bottom"/"right" via le flip CSS.
const TILE_HORIZONTAL = buildAnimatedMask('horizontal', 0);
const TILE_VERTICAL = buildAnimatedMask('vertical', 0);

const ORIENTATION_BY_DIRECTION: Record<WaveDirection, Orientation> = {
  bottom: 'horizontal',
  top: 'horizontal',
  right: 'vertical',
  left: 'vertical',
};

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  variant = 'dark',
  hasIntro = false,
  direction = 'bottom',
  className = '',
}) => {
  const fillColor = variant === 'dark' ? Colors.DarkBackground : Colors.LightForeground;
  const orientation = ORIENTATION_BY_DIRECTION[direction];
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(!hasIntro);

  useEffect(() => {
    if (!hasIntro) {
      return;
    }

    const background = backgroundRef.current;
    if (!background || typeof IntersectionObserver === 'undefined') {
      setHasEnteredViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(background);
    return () => observer.disconnect();
  }, [hasIntro]);

  const rootStyle = {
    '--wave-color': fillColor,
    '--wave-tile-front': orientation === 'horizontal' ? TILE_HORIZONTAL : TILE_VERTICAL,
  } as React.CSSProperties;

  return (
    <div
      ref={backgroundRef}
      className={`WaveBackground ${variant} ${hasIntro && hasEnteredViewport ? 'hasIntro' : ''} ${hasIntro && !hasEnteredViewport ? 'introPending' : ''} ${className}`.trim()}
      data-direction={direction}
      style={rootStyle}
      aria-hidden="true"
    >
      {/*
        Bloc unique (WaveSlider) :
        - Couvre toute la section au départ (fond plein de --wave-color)
        - Glisse vers le bord ciblé par `direction`
        - S'arrête une fois que seule la bande ondulée dépasse sur ce bord
      */}
      <div className="WaveSlider">
        {/* Aplat solide sous/derrière la vague */}
        <div className="WaveSolid" />

        {/* Couche ondulante, au bord "contenu" du slider */}
        <div className="WaveTrack">
          <div className="WaveLayer" />
        </div>
      </div>
    </div>
  );
};