// src/components/generator/MockupRenderer.tsx
// Renders the SVG/CSS mockup frame with user image clipped inside it.
'use client';

import { MockupTemplate } from '@/types';
import BookMockup from './mockups/BookMockup';
import BoxMockup from './mockups/BoxMockup';
import PhoneMockup from './mockups/PhoneMockup';
import TabletMockup from './mockups/TabletMockup';
import LaptopMockup from './mockups/LaptopMockup';
import DesktopMockup from './mockups/DesktopMockup';
import BrowserMockup from './mockups/BrowserMockup';
import WebsiteMockup from './mockups/WebsiteMockup';
import MultiDeviceMockup from './mockups/MultiDeviceMockup';

interface Props {
  template: MockupTemplate;
  userImage: string | null;
  userImage2?: string | null;
  scale: number;
  offsetX: number;
  offsetY: number;
  scale2?: number;
  offsetX2?: number;
  offsetY2?: number;
}

export default function MockupRenderer({ template, userImage, userImage2, scale, offsetX, offsetY, scale2, offsetX2, offsetY2 }: Props) {
  const sharedProps = { template, userImage, userImage2, scale, offsetX, offsetY, scale2, offsetX2, offsetY2 };

  switch (template.category) {
    case 'books':     return <BookMockup {...sharedProps} />;
    case 'boxes':     return <BoxMockup {...sharedProps} />;
    case 'phones':    return <PhoneMockup {...sharedProps} />;
    case 'tablets':   return <TabletMockup {...sharedProps} />;
    case 'laptops':   return <LaptopMockup {...sharedProps} />;
    case 'desktops':  return <DesktopMockup {...sharedProps} />;
    case 'browsers':  return <BrowserMockup {...sharedProps} />;
    case 'websites':  return <WebsiteMockup {...sharedProps} />;
    case 'multi-device': return <MultiDeviceMockup {...sharedProps} />;
    default:          return null;
  }
}
