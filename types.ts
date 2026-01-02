
import React from 'react';

export type TabType = 'Documents' | 'Media' | 'Audio' | 'Security' | 'Codes' | 'Settings';

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'document' | 'image' | 'audio' | 'video' | 'other';
  lastModified: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  premium?: boolean;
  price?: string;
  action: () => void;
}

export interface SmartScanResult {
  category: string;
  summary: string;
  entities: { label: string; value: string }[];
}

export interface SystemCode {
  code: string;
  title: string;
  description: string;
  category: 'Testing' | 'Information' | 'Advanced' | 'System';
}
