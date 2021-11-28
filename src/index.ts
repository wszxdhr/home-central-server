export * from './lib/async';
export * from './lib/number';
import Koa, { Context } from 'koa';

import { startJobs } from './jobs';
import { ResponseStore } from './jobs/store';
// 向墨水屏输出
import './outputs/ePaper';

console.log('Service is runing...');
const app = new Koa();

startJobs();

app.use(async (ctx: Context, next: () => Promise<void>) => {
  console.log(ResponseStore.get('CarFuelStatus')?.data);
  ctx.body = ResponseStore.get('CarFuelStatus')?.data?.drivingRange;
  await next();
});

app.listen(3000);
