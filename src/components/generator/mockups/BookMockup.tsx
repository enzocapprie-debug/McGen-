// src/components/generator/mockups/BookMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function BookMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isAngled = template.id === 'book-hardcover-angle';
  const isStack = template.id === 'book-stack';
  const isOpen = template.id === 'book-open';

  if (isStack) {
    return (
      <div style={{ width: 380, height: 280, position: 'relative', perspective: '800px' }}>
        {/* Bottom book (slightly offset) */}
        {[2, 1, 0].map((idx) => (
          <div key={idx} style={{
            position: 'absolute',
            left: 60 + idx * 6,
            top: 30 + idx * 18,
            width: 220, height: 290,
            borderRadius: '4px 10px 10px 4px',
            background: `linear-gradient(135deg, #${['1a1030','241540','2e1a50'][idx]}, #${['2d1050','3d1a70','4d2080'][idx]})`,
            boxShadow: '6px 8px 24px rgba(0,0,0,0.6)',
            overflow: 'hidden',
            transform: `rotateY(${isAngled ? -6 : 0}deg) rotateX(${idx * 3}deg)`,
            transformStyle: 'preserve-3d',
          }}>
            {idx === 0 && (
              <div style={{ position: 'relative', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userImage} alt="" style={getImageStyle(scale, offsetX, offsetY)} />
                ) : (
                  <div style={{
                    inset: 0, position: 'absolute', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(124,58,237,0.1)',
                  }}>
                    <span style={{ fontSize: 36, opacity: 0.3 }}>📚</span>
                  </div>
                )}
              </div>
            )}
            {/* Spine */}
            <div style={{
              position: 'absolute', left: 0, top: 0, width: 14, height: '100%',
              background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(255,255,255,0.05))',
              borderRight: '1px solid rgba(255,255,255,0.1)'
            }} />
          </div>
        ))}
      </div>
    );
  }

  const transform = isAngled
    ? 'perspective(600px) rotateY(-18deg) rotateX(3deg)'
    : 'perspective(600px) rotateY(-5deg)';

  return (
    <div style={{ width: 340, position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: 220,
        height: 300,
        borderRadius: '4px 10px 10px 4px',
        background: 'linear-gradient(135deg, #1a0a30, #2d1060)',
        boxShadow: isAngled
          ? '20px 20px 60px rgba(0,0,0,0.7), -4px 0 10px rgba(0,0,0,0.3)'
          : '12px 16px 40px rgba(0,0,0,0.6)',
        transform,
        transformOrigin: 'left center',
        position: 'relative',
        overflow: 'hidden',
        margin: '20px auto',
      }}>
        {/* Cover image */}
        {userImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={userImage} alt="" style={getImageStyle(scale, offsetX, offsetY)} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(124,58,237,0.08)',
          }}>
            <span style={{ fontSize: 48, opacity: 0.25 }}>📖</span>
          </div>
        )}
        {/* Spine shadow */}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 16, height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)',
        }} />
        {/* Highlight */}
        <div style={{
          position: 'absolute', right: 0, top: 0, width: 4, height: '100%',
          background: 'linear-gradient(to left, rgba(255,255,255,0.08), transparent)',
        }} />
        {/* Bottom shadow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 8,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
        }} />
      </div>
      {/* Ground shadow */}
      <div style={{
        position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
        width: 180, height: 20, borderRadius: '50%',
        background: 'rgba(0,0,0,0.4)',
        filter: 'blur(8px)',
      }} />
    </div>
  );
}
