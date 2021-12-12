import canvas from 'canvas';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import solarLunar from 'solarlunar';

import { ResponseStore } from '../../jobs/store';
import { WeatherMap } from '../../utils/weatherMap';

const padding = 10;
// const width = 800;
const height = 480;

const LEFT_PANEL_WIDTH = 300;

const TIME_PANEL_HEIGHT = height / 3 - 40;
const TIME_PANEL_WIDTH = LEFT_PANEL_WIDTH;
const TIME_PANEL_TIME_FONT_SIZE = 50;
const TIME_PANEL_DATE_FONT_SIZE = 20;
const TIME_PANEL_LUNAR_FONT_SIZE = 20;

const WEATHER_PANEL_HEIGHT = height / 3 + 40;
const WEATHER_PANEL_WIDTH = LEFT_PANEL_WIDTH;
const WEATHER_PANEL_FONT_SIZE = 20;

export function draw7in5(ctx: canvas.NodeCanvasRenderingContext2D) {
  const m = moment();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(LEFT_PANEL_WIDTH, padding);
  ctx.lineTo(LEFT_PANEL_WIDTH, height - padding);
  ctx.moveTo(padding, TIME_PANEL_HEIGHT);
  ctx.lineTo(TIME_PANEL_WIDTH - padding, TIME_PANEL_HEIGHT);
  ctx.moveTo(padding, TIME_PANEL_HEIGHT + WEATHER_PANEL_HEIGHT);
  ctx.lineTo(
    WEATHER_PANEL_WIDTH - padding,
    TIME_PANEL_HEIGHT + WEATHER_PANEL_HEIGHT
  );
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.font = `${TIME_PANEL_TIME_FONT_SIZE}px Arial`;
  ctx.fillText(
    `${m.format('HH:mm')}`,
    TIME_PANEL_WIDTH / 2,
    TIME_PANEL_TIME_FONT_SIZE
  );
  ctx.textAlign = 'center';
  ctx.font = `${TIME_PANEL_DATE_FONT_SIZE}px Arial`;
  ctx.fillText(
    `${m.format('YYYY年MM月DD日')} ${m.format('dddd')}`,
    TIME_PANEL_WIDTH / 2,
    TIME_PANEL_TIME_FONT_SIZE + TIME_PANEL_DATE_FONT_SIZE + 10
  );
  ctx.textAlign = 'center';
  ctx.font = `${TIME_PANEL_DATE_FONT_SIZE}px Arial`;
  const solar2lunarData = solarLunar.solar2lunar(m.year(), m.month(), m.date());
  ctx.fillText(
    `${m.format(`农历 ${solar2lunarData.monthCn}${solar2lunarData.dayCn}`)}`,
    TIME_PANEL_WIDTH / 2,
    TIME_PANEL_TIME_FONT_SIZE +
      TIME_PANEL_DATE_FONT_SIZE +
      TIME_PANEL_LUNAR_FONT_SIZE +
      16
  );
  const realtimeWeather = ResponseStore.get('RealtimeWeather');
  ctx.textAlign = 'center';
  ctx.font = `${WEATHER_PANEL_FONT_SIZE}px Arial`;
  if (realtimeWeather && realtimeWeather.status === 'ok') {
    ctx.fillText(
      `${m.format(
        `当前  ${
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          WeatherMap[realtimeWeather.result.realtime.skycon as keyof WeatherMap]
        }  ${realtimeWeather.result.realtime.temperature}°C  湿度${
          realtimeWeather.result.realtime.humidity * 100
        }%`
      )}`,
      WEATHER_PANEL_WIDTH / 2,
      TIME_PANEL_HEIGHT + WEATHER_PANEL_FONT_SIZE + padding
    );
  } else {
    ctx.fillText(
      '天气正在获取中...',
      WEATHER_PANEL_WIDTH / 2,
      TIME_PANEL_HEIGHT + WEATHER_PANEL_FONT_SIZE + padding
    );
  }
}
