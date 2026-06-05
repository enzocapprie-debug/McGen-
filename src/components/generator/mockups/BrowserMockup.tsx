// src/components/generator/mockups/BrowserMockup.tsx
'use client';
import { MockupProps, getImageStyle } from './shared';

export default function BrowserMockup({ template, userImage, scale, offsetX, offsetY }: MockupProps) {
  const isDark = template.id === 'browser-dark';
  const isSafari = template.id === 'browser-safari';

  const barBg = isDark ? '#0d0d0d' : isSafari ? '#ebebeb' : '#dee1e6';
  const barText = isDark ? '#888' : '#555';
  const bodyBg = isDark ? '#111' : '#f5f5f5';
  const frameBg = isDark ? '#1a1a1a' : isSafari ? '#d4d4d4' : '#dee1e6';
  const textColor = isDark ? '#555' : '#999';

  return (
    <div style={{
      width: 520, borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.1)'}`,
    }}>
      {/* Title bar */}
      <div style={{
        background: frameBg,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>

        {isSafari && (
          /* Safari: back/forward + address bar centered */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ fontSize: 14, color: barText, cursor: 'default' }}>‹</span>
              <span style={{ fontSize: 14, color: `${barText}80`, cursor: 'default' }}>›</span>
            </div>
            <div style={{
              flex: 1, background: isDark ? '#1f1f1f' : 'white',
              borderRadius: 8, padding: '4px 10px', fontSize: 11,
              color: barText, display: 'flex', alignItems: 'center', gap: 6,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}`,
            }}>
              <span>🔒</span> yourwebsite.com
            </div>
          </div>
        )}

        {!isSafari && (
          /* Chrome style: tabs + address */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Tab strip */}
            <div style={{ display: 'flex', gap: 2 }}>
              <div style={{
                background: isDark ? '#1f1f1f' : 'white',
                borderRadius: '6px 6px 0 0',
                padding: '3px 12px',
                fontSize: 10, color: barText, maxWidth: 140,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                Your Website
              </div>
            </div>
            {/* Address bar */}
            <div style={{
              background: isDark ? '#1f1f1f' : 'white',
              borderRadius: 20, padding: '3px 12px', fontSize: 11,
              color: barText, display: 'flex', alignItems: 'center', gap: 6,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.1)'}`,
            }}>
              <span>🔒</span> yourwebsite.com
            </div>
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{
        height: 340, background: bodyBg,
        position: 'relative', overflow: 'hidden',
      }}>
        {userImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={userImage} alt="" style={getImageStyle(scale, offsetX, offsetY)} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: isDark ? 'rgba(245,158,11,0.03)' : 'rgba(245,158,11,0.05)',
          }}>
            <span style={{ fontSize: 48, opacity: 0.15 }}>🌐</span>
          </div>
        )}
      </div>
    </div>
  );
}
