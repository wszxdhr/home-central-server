export * from './lib/async';
export * from './lib/number';
import Koa from 'koa';


console.log('hello world!!');
const app = new Koa();

app.use(async () => {
  return undefined;
});

app.listen(3000);
