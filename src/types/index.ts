// src/types/index.ts

export type MockupCategory = 'books' | 'boxes' | 'phones' | 'tablets' | 'laptops' | 'desktops' | 'browsers' | 'websites' | 'multi-device';

export interface CategoryInfo {
  id: MockupCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface MockupTemplate {
  id: string;
  name: string;
  categoryId?: string;
  category: MockupCategory;
  description: string;
  previewBg: string;
  aspectRatio: string;
  clipZone: { x: number; y: number; width: number; height: number };
}
