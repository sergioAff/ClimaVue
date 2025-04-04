export interface IWeather {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: ICurrentWeather;
  hourly: IHourly;
  daily: any;
}

interface ICurrentWeather {
  icon: string;
  icon_num: number;
  summary: string;
  temperature: number;
  feels_like?: number;
  wind: IWind;
  precipitation: IPrecipitation;
  cloud_cover: number | {
    total: number;
    low?: number;
    middle?: number;
    high?: number;
  };
  humidity: number;
  pressure: number;
  visibility: number;
  dew_point?: number;
  uv_index?: number;
}

interface IWind {
  speed: number;
  angle: number;
  dir: string;
  gusts?: number;
}

interface IPrecipitation {
  total: number;
  type: string;
}

interface IHourly {
  data: IHourlyData[];
}

interface IHourlyData {
  date: string;
  weather: string;
  icon: number | string;
  summary: string;
  temperature: number;
  feels_like?: number;
  wind: IWind;
  cloud_cover: {
    total: number;
    low?: number;
    middle?: number;
    high?: number;
  };
  precipitation: IPrecipitation;
  humidity: number;
  pressure: number;
  visibility: number;
  dew_point?: number;
}
