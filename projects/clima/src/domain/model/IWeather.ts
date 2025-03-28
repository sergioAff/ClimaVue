export interface IWeather {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: ICurrentWeather;
  hourly: IHourly;
  daily: null;
}

interface ICurrentWeather {
  icon: string;
  icon_num: number;
  summary: string;
  temperature: number;
  wind: IWind;
  precipitation: IPrecipitation;
  cloud_cover: number;
}

interface IWind {
  speed: number;
  angle: number;
  dir: string;
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
  icon: number;
  summary: string;
  temperature: number;
  wind: IWind;
  cloud_cover: {
    total: number;
  };
  precipitation: IPrecipitation;
}
