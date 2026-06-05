// src/components/layout/PoweredByFooter.tsx
'use client';

import { motion } from 'framer-motion';

export default function PoweredByFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontSize: 11,
        color: 'var(--text-muted)',
        background: 'var(--bg-secondary)',
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes apShimmer {
          0%   { background-position: 0%   center; }
          100% { background-position: 300% center; }
        }
        .ap-link {
          font-weight: 700;
          text-decoration: none;
          background: linear-gradient(
            90deg,
            #7c3aed,
            #06b6d4,
            #ec4899,
            #f97316,
            #7c3aed
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: apShimmer 4s linear infinite;
          display: inline-block;
          letter-spacing: 0.03em;
        }
      `}</style>

      <span style={{ opacity: 0.6 }}>Powered by</span>

      <motion.a
        href="https://ActivatePro.cc"
        target="_blank"
        rel="noopener noreferrer"
        className="ap-link"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="ActivatePro.cc"
      >
        ActivatePro.cc
      </motion.a>
    </footer>
  );
}
