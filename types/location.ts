import { LngLatLike } from 'mapbox-gl';

export interface GeoJSON {
  id?: string;
  type?: 'Feature';
  geometry?: {
    type?: 'Point';
    coordinates: LngLatLike;
  };
  properties: LocationProperties;
}

export interface LocationProperties {
  name: string;
  description: string;
  address: string;
  phone: string;
}
