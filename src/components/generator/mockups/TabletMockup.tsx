// src/components/generator/mockups/TabletMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function TabletMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isLandscape = template.id === 'tablet-landscape';
  const isAngled = template.id === 'tablet-angled';

  const w = isLandscape ? 380 : 240;
  const h = isLandscape ? 280 : 320;
  const screenPad = isLandscape ? '10px 12px 10px 12px' : '12px 10px 12px 10px';
  const borderR = isLandscape ? 24 : 26;

  return (
    <div style={{
      position: 'relative', display: 'inline-block',
      transform: isAngled
        ? 'perspective(900px) rotateY(-15deg) rotateX(6deg)'
        : 'none',
    }}>
      {/* Body */}
      <div style={{
        width: w, height: h,
        borderRadius: borderR,
        background: 'linear-gradient(145deg, #1c1c1e, #2c2c2e)',
        padding: screenPad,
        boxShadow: '12px 20px 50px rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
      }}>
        {/* Screen */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: isLandscape ? 16 : 18,
          overflow: 'hidden',
          background: '#0a0a14',
          position: 'relative',
        }}>
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt="" style={getImageStyle(scale, offsetX, offsetY)} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(16,185,129,0.05)',
            }}>
              <span style={{ fontSize: 42, opacity: 0.2 }}>📲</span>
            </div>
          )}
        </div>

        {/* Home indicator (landscape: right side; portrait: bottom) */}
        {isLandscape ? (
          <div style={{
            position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
            width: 4, height: 40, borderRadius: 2, background: 'rgba(255,255,255,0.15)'
          }} />
        ) : (
          <div style={{
            position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)',
            width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)'
          }} />
        )}

        {/* Glare */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: borderR,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Ground shadow */}
      <div style={{
        position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
        width: w * 0.7, height: 16, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', filter: 'blur(8px)',
      }} />
    </div>
  );
}
