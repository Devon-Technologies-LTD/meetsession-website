"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties, ReactNode } from "react";

interface NoiseElementProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  opacity?: number;
  style?: CSSProperties;
  as?: React.ElementType;
}

export function NoiseElement({
  children,
  className = "",
  intensity = 0.2,
  opacity = 0.5,
  style,
  as: Component = "div",
  ...props
}: NoiseElementProps): React.JSX.Element {
  const combinedStyle: CSSProperties = {
    ...style,
    "--noise-intensity": intensity,
    "--noise-opacity": opacity,
  } as CSSProperties;

  return (
    <Component
      className={cn(`noise-filter`, className)}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
