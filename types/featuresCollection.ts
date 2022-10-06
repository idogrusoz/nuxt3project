import { GeoJSON } from './location';

export default interface featuresCollection {
  type?: 'FeatureCollection';
  features: GeoJSON[];
}
