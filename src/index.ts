export * from './lib/async';
export * from './lib/number';
import axios from 'axios';
import Koa, { Context } from 'koa';
import qs from 'qs';

import Car from './configs/car.json';

console.log('hello world!!');
const app = new Koa();

app.use(async (ctx: Context, next: () => Promise<void>) => {
  ctx.body = (await axios.post('https://app-connected.gtmc.com.cn/appcarnetwork/app/getVehicleStatus', qs.stringify(Car.reqBody), {
    headers: Car.headers
  })).data;
  console.log(ctx.body);
  await next();
});

app.listen(3000);
