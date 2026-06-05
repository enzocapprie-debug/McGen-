// src/app/(dashboard)/generator/[category]/page.tsx
import { notFound } from 'next/navigation';
import { CATEGORIES, getTemplatesByCategory, getCategoryById } from '@/lib/mockup-data';
import { MockupCategory } from '@/types';
import TemplateGallery from '@/components/generator/TemplateGallery';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryById(category as MockupCategory);
  if (!cat) notFound();

  const templates = getTemplatesByCategory(category as MockupCategory);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: 13, color: 'var(--text-muted)' }}>
        <Link href="/generator" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Generator</Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
      </div>

      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          {cat.name}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{cat.description}</p>
      </div>

      <TemplateGallery templates={templates} category={cat} />
    </div>
  );
}
