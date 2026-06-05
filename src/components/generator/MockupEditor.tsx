// src/components/generator/MockupEditor.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Download, ArrowLeft, ZoomIn, ZoomOut,
  RefreshCw, Image as ImageIcon, Palette, X, Plus,
} from 'lucide-react';
import { MockupTemplate } from '@/types';
import MockupRenderer from './MockupRenderer';
import toast from 'react-hot-toast';

interface Props {
  template: MockupTemplate;
  onBack: () => void;
}

// One slot = one image box
interface ImageSlot {
  id: number;
  dataUrl: string | null;
  dragging: boolean;
  scale: number;
  offsetX: number;
  offsetY: number;
}

let slotCounter = 2; // slots start at id 0 and 1

function createSlot(id: number): ImageSlot {
  return { id, dataUrl: null, dragging: false, scale: 1, offsetX: 0, offsetY: 0 };
}

function getSlotLabel(templateId: string, idx: number): string {
  if (templateId === 'box-double') {
    return idx === 0 ? 'Front Box' : idx === 1 ? 'Back Box' : `Extra Box ${idx + 1}`;
  }
  if (templateId === 'multi-phone-laptop') {
    return idx === 0 ? 'Laptop Screen' : idx === 1 ? 'Phone Screen' : `Extra Screen ${idx + 1}`;
  }
  if (templateId === 'multi-tablet-laptop') {
    return idx === 0 ? 'Laptop Screen' : idx === 1 ? 'Tablet Screen' : `Extra Screen ${idx + 1}`;
  }
  if (templateId === 'multi-full-suite') {
    return idx === 0 ? 'Desktop & Laptop' : idx === 1 ? 'Tablet & Phone' : `Extra Screen ${idx + 1}`;
  }
  return `Slot ${idx + 1}`;
}

export default function MockupEditor({ template, onBack }: Props) {
  const isMultiImage = template.id === 'box-double' || template.category === 'multi-device';

  const [slots, setSlots] = useState<ImageSlot[]>(() => [createSlot(0), createSlot(1)]);
  const [activeSlotId, setActiveSlotId] = useState<number>(0);
  const [bgColor, setBgColor] = useState('#0a0a14');
  const [bgTransparent, setBgTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  // one file input ref per slot id
  const fileRefs = useRef<Map<number, HTMLInputElement>>(new Map());

  const activeSlot = slots.find((s) => s.id === activeSlotId) ?? slots[0];

  const userImage = isMultiImage ? (slots[0]?.dataUrl ?? null) : (activeSlot?.dataUrl ?? null);
  const userImage2 = isMultiImage ? (slots[1]?.dataUrl ?? null) : null;

  const scale1 = isMultiImage ? (slots[0]?.scale ?? 1) : (activeSlot?.scale ?? 1);
  const offsetX1 = isMultiImage ? (slots[0]?.offsetX ?? 0) : (activeSlot?.offsetX ?? 0);
  const offsetY1 = isMultiImage ? (slots[0]?.offsetY ?? 0) : (activeSlot?.offsetY ?? 0);

  const scale2 = isMultiImage ? (slots[1]?.scale ?? 1) : 1;
  const offsetX2 = isMultiImage ? (slots[1]?.offsetX ?? 0) : 0;
  const offsetY2 = isMultiImage ? (slots[1]?.offsetY ?? 0) : 0;

  const activeScale = activeSlot?.scale ?? 1;
  const activeOffsetX = activeSlot?.offsetX ?? 0;
  const activeOffsetY = activeSlot?.offsetY ?? 0;

  const hasAnyImage = isMultiImage ? (!!slots[0]?.dataUrl || !!slots[1]?.dataUrl) : !!activeSlot?.dataUrl;

  const setScaleForActive = (val: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === activeSlotId ? { ...s, scale: val } : s))
    );
  };
  const setOffsetXForActive = (val: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === activeSlotId ? { ...s, offsetX: val } : s))
    );
  };
  const setOffsetYForActive = (val: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === activeSlotId ? { ...s, offsetY: val } : s))
    );
  };
  const resetActivePosition = () => {
    setSlots((prev) =>
      prev.map((s) => (s.id === activeSlotId ? { ...s, scale: 1, offsetX: 0, offsetY: 0 } : s))
    );
  };

  // Load a file into a slot
  function loadFileIntoSlot(slotId: number, file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported (PNG, JPEG, WebP…)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSlots((prev) =>
        prev.map((s) => (s.id === slotId ? { ...s, dataUrl } : s))
      );
      setActiveSlotId(slotId);
    };
    reader.readAsDataURL(file);
  }

  function handleSlotFileChange(slotId: number, files: FileList | null) {
    if (!files || files.length === 0) return;
    loadFileIntoSlot(slotId, files[0]);
  }

  function handleSlotDrop(slotId: number, e: React.DragEvent) {
    e.preventDefault();
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, dragging: false } : s))
    );
    const file = e.dataTransfer.files[0];
    if (file) loadFileIntoSlot(slotId, file);
  }

  function clearSlot(slotId: number) {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, dataUrl: null } : s))
    );
    if (activeSlotId === slotId) {
      const other = slots.find((s) => s.id !== slotId);
      if (other) setActiveSlotId(other.id);
    }
  }

  function addSlot() {
    const id = slotCounter++;
    setSlots((prev) => [...prev, createSlot(id)]);
    setActiveSlotId(id);
  }

  function removeSlot(slotId: number) {
    const minSlots = isMultiImage ? 2 : 1;
    if (slots.length <= minSlots) {
      clearSlot(slotId);
      return;
    }
    setSlots((prev) => {
      const next = prev.filter((s) => s.id !== slotId);
      if (activeSlotId === slotId) setActiveSlotId(next[0]?.id ?? 0);
      return next;
    });
  }

  const setDragging = useCallback((slotId: number, val: boolean) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, dragging: val } : s))
    );
  }, []);

  async function handleExport(format: 'png' | 'jpeg') {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: bgTransparent ? null : bgColor,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const quality = format === 'jpeg' ? 0.95 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `mcgen-${template.id}-${Date.now()}.${format}`;
      link.click();
      toast.success(`Downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error('Export failed. Please try again.');
      console.error(err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 24, minHeight: '70vh' }}>
      {/* ── Left Panel ─────────────────────────────────────────── */}
      <div style={{
        width: 290, flexShrink: 0,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '20px',
        display: 'flex', flexDirection: 'column', gap: 18,
        overflowY: 'auto',
      }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: 13, cursor: 'pointer', padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back to templates
        </button>

        {/* Template info */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Template</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{template.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{template.description}</div>
        </div>

        {/* ── Image Slots ────────────────────────────────────────── */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Image Slots — click a box to upload
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {slots.map((slot, idx) => {
              const isActive = slot.id === activeSlotId;
              const slotLabel = getSlotLabel(template.id, idx);
              return (
                <div key={slot.id}>
                  {/* Hidden file input for this slot */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={(el) => {
                      if (el) fileRefs.current.set(slot.id, el);
                      else fileRefs.current.delete(slot.id);
                    }}
                    onChange={(e) => handleSlotFileChange(slot.id, e.target.files)}
                    onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  />

                  {/* The slot box */}
                  <div
                    onClick={() => {
                      setActiveSlotId(slot.id);
                      if (!slot.dataUrl) fileRefs.current.get(slot.id)?.click();
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragging(slot.id, true); }}
                    onDragLeave={() => setDragging(slot.id, false)}
                    onDrop={(e) => handleSlotDrop(slot.id, e)}
                    style={{
                      position: 'relative',
                      border: `2px ${slot.dragging ? 'solid' : isActive ? 'solid' : 'dashed'} ${
                        slot.dragging
                          ? '#06b6d4'
                          : isActive
                          ? 'var(--accent)'
                          : 'var(--border-light)'
                      }`,
                      borderRadius: 12,
                      padding: '12px',
                      cursor: 'pointer',
                      background: slot.dragging
                        ? 'rgba(6,182,212,0.06)'
                        : isActive
                        ? 'rgba(124,58,237,0.06)'
                        : 'var(--bg-secondary)',
                      transition: 'all 0.18s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      minHeight: 60,
                      boxShadow: isActive ? '0 0 0 2px rgba(124,58,237,0.18)' : 'none',
                    }}
                  >
                    {/* Slot number badge */}
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: isActive ? 'var(--accent)' : 'var(--border-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0,
                      transition: 'background 0.18s',
                    }}>
                      {idx + 1}
                    </div>

                    {slot.dataUrl ? (
                      /* Filled state */
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slot.dataUrl}
                          alt={slotLabel}
                          style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>
                            {slotLabel}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                            {isMultiImage 
                              ? (isActive ? '✓ Adjusting zoom & position' : 'Click to select/adjust')
                              : (isActive ? '✓ Active preview' : 'Click to preview')
                            }
                          </div>
                          <div
                            style={{ fontSize: 10, color: '#a78bfa', marginTop: 2, cursor: 'pointer' }}
                            onClick={(e) => { e.stopPropagation(); fileRefs.current.get(slot.id)?.click(); }}
                          >
                            Replace image
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Empty state */
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 2 }}>
                          {slotLabel}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Click</strong> or drag to upload
                        </div>
                      </div>
                    )}

                    {/* Remove slot button */}
                    {slots.length > (isMultiImage ? 2 : 1) && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeSlot(slot.id); }}
                        style={{
                          background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)',
                          borderRadius: 6, padding: '3px 6px', cursor: 'pointer',
                          color: '#f87171', fontSize: 10, flexShrink: 0,
                          display: 'flex', alignItems: 'center', gap: 3,
                        }}
                      >
                        <X size={10} />
                      </button>
                    )}
                    {/* Clear image (if filled) */}
                    {slot.dataUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); clearSlot(slot.id); }}
                        style={{
                          background: 'rgba(100,100,120,0.15)', border: '1px solid var(--border)',
                          borderRadius: 6, padding: '3px 6px', cursor: 'pointer',
                          color: 'var(--text-muted)', fontSize: 10, flexShrink: 0,
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add slot button */}
          <button
            onClick={addSlot}
            style={{
              marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, background: 'transparent', border: '1px dashed var(--border-light)',
              borderRadius: 10, padding: '8px', cursor: 'pointer', color: 'var(--text-muted)',
              fontSize: 12, fontWeight: 500, transition: 'all 0.18s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = '#a78bfa'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <Plus size={13} /> Add Image Slot
          </button>

          {/* Slot switcher (if multiple have images) */}
          {slots.filter(s => s.dataUrl).length > 1 && (
            <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {slots.filter(s => s.dataUrl).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlotId(s.id)}
                  style={{
                    padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: s.id === activeSlotId ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: s.id === activeSlotId ? 'white' : 'var(--text-muted)',
                    border: '1px solid ' + (s.id === activeSlotId ? 'var(--accent)' : 'var(--border)'),
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {getSlotLabel(template.id, slots.indexOf(s))}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scale */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scale</div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{Math.round(activeScale * 100)}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setScaleForActive(Math.max(0.3, +(activeScale - 0.05).toFixed(2)))} className="btn-secondary" style={{ padding: '6px', borderRadius: 8 }}>
              <ZoomOut size={14} />
            </button>
            <input type="range" min={0.3} max={2} step={0.05} value={activeScale} onChange={(e) => setScaleForActive(Number(e.target.value))} style={{ flex: 1, accentColor: '#7c3aed' }} />
            <button onClick={() => setScaleForActive(Math.min(2, +(activeScale + 0.05).toFixed(2)))} className="btn-secondary" style={{ padding: '6px', borderRadius: 8 }}>
              <ZoomIn size={14} />
            </button>
          </div>
        </div>

        {/* Position */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Position ({getSlotLabel(template.id, slots.indexOf(activeSlot))})
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>X</div>
              <input type="range" min={-50} max={50} step={1} value={activeOffsetX} onChange={(e) => setOffsetXForActive(Number(e.target.value))} style={{ width: '100%', accentColor: '#06b6d4' }} />
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>{activeOffsetX}px</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Y</div>
              <input type="range" min={-50} max={50} step={1} value={activeOffsetY} onChange={(e) => setOffsetYForActive(Number(e.target.value))} style={{ width: '100%', accentColor: '#06b6d4' }} />
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>{activeOffsetY}px</div>
            </div>
          </div>
          <button
            onClick={resetActivePosition}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer', marginTop: 6, padding: 0 }}
          >
            <RefreshCw size={11} /> Reset Position
          </button>
        </div>

        {/* Background */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Background</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: 10 }}>
            <input type="checkbox" checked={bgTransparent} onChange={(e) => setBgTransparent(e.target.checked)} style={{ accentColor: '#7c3aed' }} />
            Transparent
          </label>
          {!bgTransparent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Palette size={14} color="var(--text-muted)" />
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                style={{ width: 36, height: 30, border: '1px solid var(--border)', borderRadius: 6, padding: 2, background: 'var(--bg-secondary)', cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{bgColor}</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['#0a0a14', '#050508', '#0f0f1a', '#ffffff', '#1a1a2e', '#0d1117', '#1c1c28'].map((c) => (
              <button key={c} onClick={() => { setBgColor(c); setBgTransparent(false); }} title={c}
                style={{ width: 22, height: 22, borderRadius: 6, background: c, border: bgColor === c ? '2px solid #7c3aed' : '1px solid var(--border)', cursor: 'pointer', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* Export */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Export Active Preview</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button className="btn-primary" onClick={() => handleExport('png')} disabled={exporting}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ flex: 1, padding: '9px 12px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {exporting ? <div className="spinner" style={{ width: 12, height: 12 }} /> : <Download size={12} />}
              <span>PNG</span>
            </motion.button>
            <motion.button className="btn-secondary" onClick={() => handleExport('jpeg')} disabled={exporting}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ flex: 1, padding: '9px 12px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {exporting ? <div className="spinner" style={{ width: 12, height: 12 }} /> : <Download size={12} />}
              JPEG
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Canvas Preview ─────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
        <div
          ref={previewRef}
          style={{
            width: '100%', maxWidth: 680,
            background: bgTransparent
              ? 'repeating-conic-gradient(#1a1a2e 0% 25%, #0f0f1a 0% 50%) 0 0 / 20px 20px'
              : bgColor,
            borderRadius: 16, border: '1px solid var(--border)',
            padding: '40px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 400, position: 'relative', overflow: 'hidden',
          }}
        >
          {!hasAnyImage && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              pointerEvents: 'none',
            }}>
              <ImageIcon size={40} color="var(--text-muted)" style={{ opacity: 0.4 }} />
              <p style={{ color: 'var(--text-muted)', fontSize: 13, opacity: 0.6 }}>
                Click a slot on the left and upload your image
              </p>
            </div>
          )}
          <MockupRenderer
            template={template}
            userImage={userImage}
            userImage2={userImage2}
            scale={scale1}
            offsetX={offsetX1}
            offsetY={offsetY1}
            scale2={scale2}
            offsetX2={offsetX2}
            offsetY2={offsetY2}
          />
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
          📐 Active: {getSlotLabel(template.id, slots.indexOf(activeSlot))} — export at 2× resolution
        </p>
      </div>
    </div>
  );
}
