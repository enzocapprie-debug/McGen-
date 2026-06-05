// src/components/generator/mockups/MultiDeviceMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function MultiDeviceMockup({
  template,
  userImage,
  userImage2,
  scale,
  offsetX,
  offsetY,
  scale2,
  offsetX2,
  offsetY2,
}: MockupProps) {
  const isPhoneLaptop = template.id === 'multi-phone-laptop';
  const isTabletLaptop = template.id === 'multi-tablet-laptop';

  const imgStyle1 = getImageStyle(scale, offsetX, offsetY);
  const imgStyle2 = getImageStyle(scale2 ?? scale, offsetX2 ?? offsetX, offsetY2 ?? offsetY);

  // image1 → primary (laptop/desktop), image2 → secondary (phone/tablet)
  const img1 = userImage;
  const img2 = userImage2 ?? userImage; // fall back to img1 if no second image

  const placeholder = (emoji: string) => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 32, opacity: 0.15 }}>{emoji}</span>
    </div>
  );

  if (isPhoneLaptop) {
    return (
      <div style={{ position: 'relative', width: 480, height: 300 }}>
        {/* Laptop — image 1 */}
        <div style={{
          position: 'absolute', left: 0, top: 20,
          width: 320, height: 200,
          background: '#1c1c1e', borderRadius: '10px 10px 2px 2px',
          padding: '10px 10px 6px',
          boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
            {img1
              ? <img src={img1} alt="" style={imgStyle1} /> // eslint-disable-line @next/next/no-img-element
              : placeholder('💻')}
          </div>
        </div>
        {/* Laptop base */}
        <div style={{ position: 'absolute', left: -8, top: 218, width: 340, height: 12, background: '#111113', borderRadius: '0 0 8px 8px' }} />

        {/* Phone — image 2 */}
        <div style={{
          position: 'absolute', right: 20, bottom: 0,
          width: 90, height: 190,
          background: '#1c1c1e', borderRadius: 20,
          padding: '8px 5px',
          boxShadow: '8px 16px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 13, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
            {img2
              ? <img src={img2} alt="" style={imgStyle2} /> // eslint-disable-line @next/next/no-img-element
              : placeholder('📱')}
            {/* Dynamic island */}
            <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 30, height: 8, background: '#000', borderRadius: 6 }} />
          </div>
        </div>
      </div>
    );
  }

  if (isTabletLaptop) {
    return (
      <div style={{ position: 'relative', width: 520, height: 280 }}>
        {/* Laptop — image 1 */}
        <div style={{
          position: 'absolute', left: 0, top: 0,
          width: 300, height: 190,
          background: '#1c1c1e', borderRadius: '10px 10px 2px 2px',
          padding: '10px 10px 6px',
          boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
            {img1
              ? <img src={img1} alt="" style={imgStyle1} /> // eslint-disable-line @next/next/no-img-element
              : placeholder('💻')}
          </div>
        </div>
        <div style={{ position: 'absolute', left: -8, top: 188, width: 318, height: 10, background: '#111113', borderRadius: '0 0 8px 8px' }} />

        {/* Tablet — image 2 */}
        <div style={{
          position: 'absolute', right: 0, top: 20,
          width: 200, height: 155,
          background: '#1c1c1e', borderRadius: 16,
          padding: '8px 8px',
          boxShadow: '8px 16px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 9, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
            {img2
              ? <img src={img2} alt="" style={imgStyle2} /> // eslint-disable-line @next/next/no-img-element
              : placeholder('📲')}
          </div>
        </div>
      </div>
    );
  }

  // Full suite: Desktop + Laptop + Tablet + Phone
  // image1 → desktop+laptop, image2 → tablet+phone
  return (
    <div style={{ position: 'relative', width: 580, height: 360 }}>
      {/* Desktop monitor — image 1 */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 260, height: 170, background: '#1c1c1e', borderRadius: '8px 8px 2px 2px', padding: '8px 8px 5px', boxShadow: '0 16px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 3, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
          {img1 ? <img src={img1} alt="" style={imgStyle1} /> : placeholder('🖥️')} {/* eslint-disable-line @next/next/no-img-element */}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 118, top: 170, width: 4, height: 24, background: '#111113' }} />
      <div style={{ position: 'absolute', left: 80, top: 192, width: 80, height: 8, background: '#111113', borderRadius: '0 0 6px 6px' }} />

      {/* Laptop — image 1 */}
      <div style={{ position: 'absolute', left: 160, top: 60, width: 240, height: 152, background: '#1c1c1e', borderRadius: '8px 8px 2px 2px', padding: '8px 8px 5px', boxShadow: '0 16px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 3, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
          {img1 ? <img src={img1} alt="" style={imgStyle1} /> : placeholder('💻')} {/* eslint-disable-line @next/next/no-img-element */}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 152, top: 210, width: 256, height: 8, background: '#111113', borderRadius: '0 0 8px 8px' }} />

      {/* Tablet — image 2 */}
      <div style={{ position: 'absolute', right: 60, top: 130, width: 110, height: 145, background: '#1c1c1e', borderRadius: 16, padding: '6px 6px', boxShadow: '8px 16px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
          {img2 ? <img src={img2} alt="" style={imgStyle2} /> : placeholder('📲')} {/* eslint-disable-line @next/next/no-img-element */}
        </div>
      </div>

      {/* Phone — image 2 */}
      <div style={{ position: 'absolute', right: 0, top: 190, width: 60, height: 120, background: '#1c1c1e', borderRadius: 14, padding: '5px 4px', boxShadow: '8px 16px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 9, overflow: 'hidden', background: '#0a0a14', position: 'relative' }}>
          {img2 ? <img src={img2} alt="" style={imgStyle2} /> : placeholder('📱')} {/* eslint-disable-line @next/next/no-img-element */}
        </div>
      </div>

      {/* Ground shadow */}
      <div style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 14, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', filter: 'blur(10px)' }} />
    </div>
  );
}
