// src/components/generator/mockups/shared.ts
export interface MockupProps {
  template: import('@/types').MockupTemplate;
  userImage: string | null;
  userImage2?: string | null; // second screen/box
  scale: number;
  offsetX: number;
  offsetY: number;
  scale2?: number;
  offsetX2?: number;
  offsetY2?: number;
}

// Screen/clip zone image renderer helper
export function getImageStyle(
  scale: number,
  offsetX: number,
  offsetY: number
): React.CSSProperties {
  return {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
    transformOrigin: 'center center',
  };
}
