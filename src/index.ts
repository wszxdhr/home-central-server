export * from './lib/async';
export * from './lib/number';
import Koa from 'koa';
import moment from 'moment';

moment.defineLocale('zh-cn', {
  weekdays: [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ],
});

import { startJobs } from './jobs';
import router from './routers';

console.log('Service is runing...');
const app = new Koa();

startJobs();

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
