// src/app/(dashboard)/generator/page.tsx
import Link from 'next/link';
import { CATEGORIES } from '@/lib/mockup-data';
import {
  BookOpen, Package, Smartphone, Tablet, Laptop, Monitor,
  Globe, Layout, Layers, ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Package, Smartphone, Tablet, Laptop, Monitor, Globe, Layout, Layers,
};

export default function GeneratorPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 30, fontWeight: 700, marginBottom: 8 }}>
          Mockup Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Select a category to browse templates and start creating.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 18
      }}>
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon];
          return (
            <Link
              key={cat.id}
              href={`/generator/${cat.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="card-hover"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16, padding: '24px 22px',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Background gradient blob */}
                <div style={{
                  position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13,
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {Icon && <Icon size={24} color={cat.color} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Space Grotesk,sans-serif', marginBottom: 4 }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {cat.description}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: 12, borderTop: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Browse templates
                  </span>
                  <ArrowRight size={14} color={cat.color} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
