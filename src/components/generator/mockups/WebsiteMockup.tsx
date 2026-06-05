// src/components/generator/mockups/WebsiteMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function WebsiteMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isPerspective = template.id === 'website-perspective';
  const isFloating = template.id === 'website-floating';

  const transform = isPerspective
    ? 'perspective(1000px) rotateY(-20deg) rotateX(8deg) scale(0.9)'
    : 'none';

  return (
    <div style={{
      position: 'relative', display: 'inline-block',
      filter: isFloating ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' : 'none',
    }}>
      <div style={{
        width: 360,
        height: isPerspective ? 460 : 520,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: isFloating
          ? '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.15)'
          : '0 24px 70px rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.07)',
        transform,
        position: 'relative',
        background: '#0a0a14',
      }}>
        {userImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={userImage} alt="" style={getImageStyle(scale, offsetX, offsetY)} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            background: 'rgba(99,102,241,0.05)',
          }}>
            <span style={{ fontSize: 48, opacity: 0.2 }}>🖼️</span>
            <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>Website screenshot</div>
          </div>
        )}

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', right: 6, top: 20, bottom: 20,
          width: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.04)',
        }}>
          <div style={{
            width: '100%', height: '25%',
            background: 'rgba(255,255,255,0.12)', borderRadius: 2,
            marginTop: '10%',
          }} />
        </div>
      </div>

      {/* Floating glow under */}
      {isFloating && (
        <div style={{
          position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
          width: 300, height: 20, borderRadius: '50%',
          background: 'rgba(99,102,241,0.3)', filter: 'blur(20px)',
        }} />
      )}
    </div>
  );
}
