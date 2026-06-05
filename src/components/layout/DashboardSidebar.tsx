// src/components/layout/DashboardSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles, LayoutDashboard, Wand2
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/generator', label: 'Generator', icon: Wand2 },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '0 6px' }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Sparkles size={15} color="white" />
        </div>
        <span style={{ fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>
          McGen<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+</span>
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
                border: active ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} color={active ? '#a78bfa' : 'var(--text-muted)'} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
