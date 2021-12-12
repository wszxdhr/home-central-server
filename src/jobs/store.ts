import { RealtimeWeatherType } from './responseTypes/weather';

export type resType = RealtimeWeatherType;

export const ResponseStore: Map<string, resType> = new Map();
