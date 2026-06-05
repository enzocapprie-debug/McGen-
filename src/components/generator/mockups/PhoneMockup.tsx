// src/components/generator/mockups/PhoneMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function PhoneMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isAngled = template.id === 'phone-angled';
  const isFloating = template.id === 'phone-floating';

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      transform: isAngled
        ? 'perspective(900px) rotateY(-20deg) rotateX(5deg)'
        : 'none',
      animation: isFloating ? 'float 3.5s ease-in-out infinite' : 'none',
    }}>
      {/* Phone body */}
      <div style={{
        width: 160,
        height: 320,
        borderRadius: 32,
        background: 'linear-gradient(145deg, #1c1c1e, #2c2c2e)',
        padding: '12px 8px',
        boxShadow: isFloating
          ? '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.15)'
          : '12px 20px 50px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        {/* Screen */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 24,
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
              background: 'rgba(6,182,212,0.05)',
            }}>
              <span style={{ fontSize: 36, opacity: 0.2 }}>📱</span>
            </div>
          )}
          {/* Status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 26, background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Dynamic island */}
            <div style={{
              width: 60, height: 16, background: '#000',
              borderRadius: 12,
            }} />
          </div>
        </div>

        {/* Side button */}
        <div style={{
          position: 'absolute', right: -3, top: 80, width: 3, height: 40,
          background: 'rgba(255,255,255,0.1)', borderRadius: '0 2px 2px 0'
        }} />
        {/* Volume buttons */}
        <div style={{
          position: 'absolute', left: -3, top: 80, width: 3, height: 28,
          background: 'rgba(255,255,255,0.1)', borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute', left: -3, top: 116, width: 3, height: 28,
          background: 'rgba(255,255,255,0.1)', borderRadius: '2px 0 0 2px'
        }} />

        {/* Reflection glare */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          borderRadius: '32px 32px 0 0',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Floating glow shadow */}
      {isFloating && (
        <div style={{
          position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 20, borderRadius: '50%',
          background: 'rgba(6,182,212,0.3)',
          filter: 'blur(14px)',
        }} />
      )}

      {/* Ground shadow */}
      <div style={{
        position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 16, borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)',
        filter: 'blur(10px)',
      }} />
    </div>
  );
}
