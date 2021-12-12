import CarReqConfig from '../requests/car/config.json';
import SynologyReqConfig from '../requests/synology/config.json';
import { RequestConfigList } from '../requests/types';
import WeatherReqConfig from '../requests/weather/config.json';

export const requests: {
  config: RequestConfigList;
  requestName: string;
}[] = [
  {
    config: CarReqConfig,
    requestName: 'CarFuelStatus',
  },
  {
    config: CarReqConfig,
    requestName: 'EvChargingStatus',
  },
  {
    config: CarReqConfig,
    requestName: 'RecordInfo',
  },
  {
    config: SynologyReqConfig,
    requestName: 'MessageList',
  },
  {
    config: WeatherReqConfig,
    requestName: 'RealtimeWeather',
  },
  {
    config: WeatherReqConfig,
    requestName: 'WeatherReport',
  },
];
