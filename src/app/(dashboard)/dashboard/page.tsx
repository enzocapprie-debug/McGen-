import Link from 'next/link';
import { CATEGORIES } from '@/lib/mockup-data';
import {
  BookOpen, Package, Smartphone, Tablet, Laptop, Monitor,
  Globe, Layout, Layers, ArrowRight, Sparkles, Zap
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Package, Smartphone, Tablet, Laptop, Monitor, Globe, Layout, Layers,
};

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Welcome */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>McGen+ Dashboard</span>
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Welcome to <span className="gradient-text">McGen+</span>!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Choose a category below to start generating your professional mockups.
        </p>
      </div>

      {/* Quick CTA */}
      <Link href="/generator" style={{ textDecoration: 'none', display: 'block', marginBottom: 40 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.08) 100%)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 18, padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 16,
          transition: 'all 0.2s ease', cursor: 'pointer'
        }}
        className="card-hover"
        >
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Zap size={24} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, fontFamily: 'Space Grotesk,sans-serif' }}>
              Create New Mockup
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Browse all 9 categories and 27+ templates
            </div>
          </div>
          <ArrowRight size={20} color="var(--text-muted)" />
        </div>
      </Link>

      {/* Categories Grid */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          Browse by Category
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14
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
                    borderRadius: 14,
                    padding: '20px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12
                  }}>
                    {Icon && <Icon size={20} color={cat.color} />}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {cat.description.slice(0, 50)}...
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
