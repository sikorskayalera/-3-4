export type FeatureType = 'common' | 'specific';
export type FeaturePriority = 'high' | 'medium' | 'low';

export interface Feature {
  id: string;
  name: string;
  type: FeatureType;
  objectId?: string; // Defined if it's a specific feature
  valueDescription: string; // Interval/value description, e.g. "Так/Ні", "Всі пристрої", "iOS"
  priority: FeaturePriority;
}

export interface MobileObject {
  id: string;
  name: string;
  brand: string;
  color: string;
  accentColor: string;
  description: string;
  tagline: string;
  specifications: string[];
}

export type WeightModel = 'model_a' | 'model_b' | 'model_c';
