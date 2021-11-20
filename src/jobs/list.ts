import CarReqConfig from '../requests/car/config.json';
import SynologyReqConfig from '../requests/synology/config.json';
import { RequestConfigList } from '../requests/types';

export const requests: {
  config: RequestConfigList;
  requestName: string;
}[] = [{
  config: CarReqConfig,
  requestName: 'CarFuelStatus'
}, {
  config: CarReqConfig,
  requestName: 'EvChargingStatus'
}, {
  config: CarReqConfig,
  requestName: 'RecordInfo'
}, {
  config: SynologyReqConfig,
  requestName: 'MessageList'
}];