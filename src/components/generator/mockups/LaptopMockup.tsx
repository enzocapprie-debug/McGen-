// src/components/generator/mockups/LaptopMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function LaptopMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isAngled = template.id === 'laptop-angled';
  const isTopdown = template.id === 'laptop-topdown';

  const transform = isAngled
    ? 'perspective(900px) rotateY(-20deg) rotateX(5deg)'
    : isTopdown
    ? 'perspective(600px) rotateX(40deg)'
    : 'none';

  return (
    <div style={{ position: 'relative', display: 'inline-block', transform }}>
      {/* Screen lid */}
      <div style={{
        width: 420,
        height: 270,
        background: 'linear-gradient(145deg, #1c1c1e, #2a2a2c)',
        borderRadius: '16px 16px 4px 4px',
        padding: '14px 16px 10px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        {/* Screen */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '6px 6px 2px 2px',
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
              background: 'rgba(59,130,246,0.05)',
            }}>
              <span style={{ fontSize: 48, opacity: 0.2 }}>💻</span>
            </div>
          )}
        </div>

        {/* Camera notch */}
        <div style={{
          position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: '50%', background: '#2a2a2c',
          border: '1px solid rgba(255,255,255,0.15)',
        }} />

        {/* Screen glare */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '16px 16px 4px 4px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Hinge */}
      <div style={{
        width: '100%', height: 6,
        background: 'linear-gradient(to bottom, #111113, #1c1c1e)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }} />

      {/* Base / keyboard */}
      <div style={{
        width: 430, height: 22,
        background: 'linear-gradient(145deg, #232325, #1a1a1c)',
        borderRadius: '0 0 10px 10px',
        marginLeft: -5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        borderTop: 'none',
        position: 'relative',
      }}>
        {/* Trackpad */}
        <div style={{
          width: 80, height: 12, borderRadius: 4,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }} />
      </div>

      {/* Ground shadow */}
      <div style={{
        width: '80%', height: 14, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', filter: 'blur(10px)',
        margin: '4px auto 0',
      }} />
    </div>
  );
}
