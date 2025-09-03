import React from "react";

interface NoiseFilterSVGProps {
  intensity?: number;
  baseFrequency?: number;
  numOctaves?: number;
}

export function NoiseFilterSVG({
  intensity = 0.65,
  baseFrequency = 0.65,
  numOctaves = 30,
}: NoiseFilterSVGProps): React.JSX.Element {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="noiseFilter" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            // stitchTiles="stitch"
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            // scale={intensity * 20}
            scale={intensity * 500}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
