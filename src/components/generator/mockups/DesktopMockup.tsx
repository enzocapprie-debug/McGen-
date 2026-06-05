// src/components/generator/mockups/DesktopMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function DesktopMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isUltrawide = template.id === 'desktop-ultrawide';
  const isTilted = template.id === 'desktop-tilted';

  const screenW = isUltrawide ? 480 : 380;
  const screenH = isUltrawide ? 200 : 240;

  return (
    <div style={{
      position: 'relative', display: 'inline-block',
      transform: isTilted ? 'perspective(900px) rotateY(-12deg) rotateX(3deg)' : 'none',
    }}>
      {/* Monitor bezel */}
      <div style={{
        width: screenW + 32,
        height: screenH + 28,
        background: 'linear-gradient(145deg, #1c1c1e, #2c2c2e)',
        borderRadius: 14,
        padding: '12px 12px 8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
      }}>
        {/* Screen */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 6,
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
              background: 'rgba(236,72,153,0.05)',
            }}>
              <span style={{ fontSize: 52, opacity: 0.2 }}>🖥️</span>
            </div>
          )}
        </div>

        {/* Camera */}
        <div style={{
          position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
        }} />

        {/* Glare */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {!isUltrawide && (
        <>
          {/* iMac-style neck */}
          <div style={{
            width: 4, height: 30,
            background: '#222224',
            margin: '0 auto',
          }} />
          {/* Base */}
          <div style={{
            width: 100, height: 10,
            background: 'linear-gradient(to bottom, #222224, #1a1a1c)',
            borderRadius: '0 0 8px 8px',
            margin: '0 auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }} />
        </>
      )}

      {/* Shadow */}
      <div style={{
        width: '60%', height: 12, borderRadius: '50%',
        background: 'rgba(0,0,0,0.4)', filter: 'blur(10px)',
        margin: isUltrawide ? '6px auto 0' : '4px auto 0',
      }} />
    </div>
  );
}
