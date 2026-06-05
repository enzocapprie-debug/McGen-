// src/components/generator/mockups/BoxMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function BoxMockup({ template, userImage, userImage2, scale, offsetX, offsetY, scale2, offsetX2, offsetY2 }: MockupProps) {
  const isAngled = template.id === 'box-angled';
  const isDouble = template.id === 'box-double';

  const imgStyle1 = getImageStyle(scale, offsetX, offsetY);
  const imgStyle2 = getImageStyle(scale2 ?? scale, offsetX2 ?? offsetX, offsetY2 ?? offsetY);

  const Box = ({ image, style, label }: { image?: string | null; style: React.CSSProperties; label?: string }) => (
    <div style={{
      position: 'relative',
      width: 190, height: 240,
      transformStyle: 'preserve-3d',
    }}>
      {/* Front face */}
      <div style={{
        position: 'absolute',
        width: 190, height: 240,
        background: 'linear-gradient(145deg, #1a0a40, #2d1070)',
        borderRadius: '4px 4px 4px 4px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" style={style} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'rgba(124,58,237,0.08)',
          }}>
            <span style={{ fontSize: 40, opacity: 0.2 }}>📦</span>
            {label && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.05em' }}>{label}</span>}
          </div>
        )}
        {/* Glare */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)',
        }} />
      </div>

      {/* Top face (only for angled) */}
      {isAngled && (
        <div style={{
          position: 'absolute',
          width: 190, height: 40,
          top: -35, left: 0,
          background: 'linear-gradient(135deg, #2d1070, #1a0a40)',
          transform: 'perspective(600px) rotateX(60deg)',
          transformOrigin: 'bottom center',
          opacity: 0.85,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }} />
      )}

      {/* Right face (for angled) */}
      {isAngled && (
        <div style={{
          position: 'absolute',
          width: 50, height: 240,
          top: 0, right: -44,
          background: 'linear-gradient(to right, #0f0620, #1a0a30)',
          transform: 'perspective(600px) rotateY(-60deg)',
          transformOrigin: 'left center',
          opacity: 0.7,
        }} />
      )}
    </div>
  );

  if (isDouble) {
    return (
      <div style={{ position: 'relative', width: 300, height: 320 }}>
        {/* Back box — Box 2 */}
        <div style={{ position: 'absolute', left: 0, top: 40, transform: 'perspective(700px) rotateY(-8deg)' }}>
          <Box image={userImage2} style={imgStyle2} label="BOX 2" />
        </div>
        {/* Front box — Box 1 */}
        <div style={{ position: 'absolute', left: 80, top: 0, transform: 'perspective(700px) rotateY(-5deg)' }}>
          <Box image={userImage} style={imgStyle1} label="BOX 1" />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      transform: isAngled
        ? 'perspective(700px) rotateY(-15deg) rotateX(5deg)'
        : 'perspective(700px) rotateY(-5deg)',
      display: 'inline-block',
    }}>
      <Box image={userImage} style={imgStyle1} />
    </div>
  );
}
