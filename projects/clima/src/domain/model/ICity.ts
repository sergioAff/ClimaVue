export interface IRequiredQueryCity {
  query: string;
}

export interface ILocation {
  name: string;
  place_id: string;
  adm_area1?: string;
  adm_area2?: string;
  country: string;
  lat: number;
  lon: number;
  timezone?: string;
  type?: string;
}
