import { WeatherMap } from '../../utils/weatherMap';

type status = 'ok' | 'failed';

export interface RealtimeWeatherType {
  status: status;
  error: string;
  api_version: string;
  result: {
    realtime: {
      status: status;
      temperature: number;
      humidity: number;
      cloudrate: number;
      skycon: string;
      visibility: number;
      dswrf: number;
      wind: {
        speed: number;
        direction: number;
      };
      pressure: number;
      apparent_temperature: number;
      precipitation: {
        local: {
          status: status;
          datasource: string;
          intensity: number;
        };
        nearest: {
          status: status;
          distance: number;
          intensity: number;
        };
      };
      air_quality: {
        pm25: number;
        pm10: number;
        o3: number;
        so2: number;
        no2: number;
        co: number;
        aqi: {
          chn: number;
          usa: number;
        };
        description: {
          usa: string;
          chn: string;
        };
      };
      life_index: {
        ultraviolet: {
          index: number;
          desc: string;
        };
        comfort: {
          index: number;
          desc: string;
        };
      };
    };
    primary: number;
  };
}
