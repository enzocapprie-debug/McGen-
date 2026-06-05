// src/app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Package, Smartphone, Tablet, Laptop, Monitor,
  Globe, Layout, Layers, Zap, Shield, Download, ArrowRight,
  Sparkles, Check
} from 'lucide-react';

const shimmerStyle: React.CSSProperties = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontWeight: 800,
  background: 'linear-gradient(90deg, #7c3aed 0%, #06b6d4 30%, #ec4899 60%, #7c3aed 90%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'shimmer 3s linear infinite',
};

const shimmerStyleSmall: React.CSSProperties = {
  ...shimmerStyle,
  fontWeight: 700,
  fontSize: 20,
};

const FEATURES = [
  { icon: BookOpen, name: 'Books & Covers', color: '#f97316', gradient: 'from-orange-500 to-amber-600' },
  { icon: Package, name: 'Software Boxes', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
  { icon: Smartphone, name: 'Mobile Devices', color: '#06b6d4', gradient: 'from-cyan-500 to-blue-600' },
  { icon: Tablet, name: 'Tablets', color: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
  { icon: Laptop, name: 'Laptops', color: '#3b82f6', gradient: 'from-blue-500 to-indigo-600' },
  { icon: Monitor, name: 'Desktops', color: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
  { icon: Globe, name: 'Browser Windows', color: '#f59e0b', gradient: 'from-yellow-500 to-orange-500' },
  { icon: Layout, name: 'Website Windows', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
  { icon: Layers, name: 'Multi-Device Bundles', color: '#14b8a6', gradient: 'from-teal-500 to-cyan-600' },
];

const PERKS = [
  { icon: Zap, title: 'Real-Time Preview', desc: 'See your image snap into place instantly as you adjust.' },
  { icon: Shield, title: 'Fully Private', desc: 'All processing happens in your browser — nothing uploaded to servers.' },
  { icon: Download, title: 'High-Res Export', desc: 'Download pixel-perfect PNG or JPEG files ready for anywhere.' },
];

const HIGHLIGHTS = [
  '27+ professional mockup templates',
  '9 device categories',
  'Real-time canvas editor',
  'Transparent background support',
  'PNG & JPEG export',
  '100% client-side processing',
];

export default function LandingPage() {
  return (
    <div className="animated-bg min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes titlePulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(124,58,237,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(6,182,212,0.6)); }
        }
        .mcgen-title { animation: shimmer 3s linear infinite, titlePulse 4s ease-in-out infinite; }
      `}</style>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="glass sticky top-0 z-50">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Sparkles size={18} color="white" />
              </div>
              <span style={shimmerStyleSmall} className="mcgen-title">
                McGen+
              </span>
            </div>
            <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Launch App</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 24px 80px', textAlign: 'center', position: 'relative' }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 28
          }}>
            <Sparkles size={13} color="#a78bfa" />
            <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>
              Professional Mockup & eCover Generator
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 820,
            margin: '0 auto 24px'
          }}>
            Create Stunning{' '}
            <span className="gradient-text">Professional Mockups</span>{' '}
            in Seconds
          </h1>

          <p style={{
            fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560,
            margin: '0 auto 40px', lineHeight: 1.7
          }}>
            McGen+ lets you wrap your designs onto beautiful 3D device frames, book covers,
            software boxes, and more — entirely in your browser, no installs required.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 32px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span>Open Generator</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Hero mockup preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          style={{ marginTop: 80, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          {['📱 Phone', '💻 Laptop', '📚 Book', '🖥️ Desktop', '📦 Box'].map((label, i) => (
            <motion.div
              key={label}
              className="glass card-hover"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{
                padding: '12px 20px', borderRadius: 12,
                fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Category Grid ────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 700, marginBottom: 12
          }}>
            9 Professional Categories
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            Every mockup type you&apos;ll ever need, all in one place.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16
        }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '24px 20px',
                cursor: 'default'
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.color}18`,
                border: `1px solid ${f.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14
              }}>
                <f.icon size={22} color={f.color} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{f.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {PERKS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '32px 28px'
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18
              }}>
                <p.icon size={24} color="#a78bfa" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 14 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Highlights strip ─────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12
          }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Check size={11} color="#10b981" />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 24,
            padding: '64px 48px',
            maxWidth: 600
          }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 700, marginBottom: 16
            }}>
              Ready to create your first mockup?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16, lineHeight: 1.6 }}>
              Join McGen+ for free. No credit card. No software to install.
            </p>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 40px', fontSize: 16 }}
              >
                <span>Launch App</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 13
      }}>
        <div style={{ marginBottom: 10 }}>
          <span style={shimmerStyle} className="mcgen-title">
            McGen+
          </span>{' '}
          <span style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} · Part of the Antigravity Ecosystem · Built with ❤️</span>
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          <span style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Powered by </span>
          <motion.a
            href="https://ActivatePro.cc"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 700,
              textDecoration: 'none',
              background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899, #f97316, #7c3aed)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
              display: 'inline-block',
              letterSpacing: '0.03em',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            ActivatePro.cc
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
