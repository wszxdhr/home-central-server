export * from './lib/async';
export * from './lib/number';
import Koa from 'koa';

import { startJobs } from './jobs';
import router from './routers';

console.log('Service is runing...');
const app = new Koa();

startJobs();

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
