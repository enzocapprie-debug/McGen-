// src/components/generator/TemplateGallery.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockupTemplate, CategoryInfo } from '@/types';
import MockupEditor from './MockupEditor';

interface Props {
  templates: MockupTemplate[];
  category: CategoryInfo;
}

export default function TemplateGallery({ templates, category }: Props) {
  const [selected, setSelected] = useState<MockupTemplate | null>(null);

  if (selected) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MockupEditor
          template={selected}
          onBack={() => setSelected(null)}
        />
      </motion.div>
    );
  }

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
        {templates.length} templates available — click one to open the editor
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16
      }}>
        <AnimatePresence>
          {templates.map((tmpl, i) => (
            <motion.div
              key={tmpl.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="card-hover"
              onClick={() => setSelected(tmpl)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Template preview area */}
              <div style={{
                background: tmpl.previewBg,
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${category.color}15 0%, transparent 70%)`,
                }} />
                <span style={{ fontSize: 48, position: 'relative', zIndex: 1 }}>
                  {getCategoryEmoji(category.id)}
                </span>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '8px 12px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500,
                  textAlign: 'center'
                }}>
                  Click to edit
                </div>
              </div>

              {/* Template info */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{tmpl.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{tmpl.description}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getCategoryEmoji(id: string): string {
  const map: Record<string, string> = {
    books: '📚',
    boxes: '📦',
    phones: '📱',
    tablets: '📲',
    laptops: '💻',
    desktops: '🖥️',
    browsers: '🌐',
    websites: '🖼️',
    'multi-device': '⚡',
  };
  return map[id] ?? '🎨';
}
