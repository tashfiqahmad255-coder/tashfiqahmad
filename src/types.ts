export interface Project {
  id: string;
  title: string;
  category: 'video' | 'design' | 'motion';
  description: string;
  tags: string[];
  thumbnail: string;
  stats?: { label: string; value: string }[];
}

export interface VideoFilter {
  id: string;
  name: string;
  cssFilter: string;
  colorGradingWheelColor: string;
  description: string;
}

export interface DesignLayer {
  id: string;
  name: string;
  opacity: number;
  colorHex?: string;
  description: string;
}
