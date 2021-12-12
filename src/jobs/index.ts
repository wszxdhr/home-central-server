import { makeRequest } from '../requests';
import { RequestConfigList } from '../requests/types';
import sleep from '../utils/sleep';

import { requests } from './list';
import { ResponseStore, resType } from './store';

const timerList: NodeJS.Timer[] = [];

export const startJobs = async () => {
  console.log('Starting jobs...');
  // 按请求间隔时长分类
  const intervalMap: Map<
    number,
    { config: RequestConfigList; name: string }[]
  > = new Map();
  let count = 0;
  for (const req of requests) {
    const requestConfigList: RequestConfigList = req.config;
    // 请求名
    const requestName = req.requestName;
    // 请求详细config
    const requestConfig =
      requestConfigList.requests && requestConfigList.requests[requestName];
    // 间隔时长
    const interval =
      parseInt(
        requestConfig.interval === 'common'
          ? requestConfigList.common?.interval
          : requestConfig.interval
      ) || 60000;
    if (requestConfig) {
      const list = intervalMap.get(interval) || [];
      list.push({ name: requestName, config: requestConfigList });
      intervalMap.set(interval, list);
      count++;
    }
  }
  console.log(
    `Find ${count} configs, ${[...intervalMap.values()].length} intervals`
  );
  // 按间隔分配setInterval
  for (const [interval, configList] of intervalMap.entries()) {
    console.log(`Setting requests by interval: ${interval}`);
    const req = async () => {
      for (const { config, name } of configList) {
        await makeRequest(config, name).then((res) => {
          console.log(`Fetch request successfully: [${name}]`);
          ResponseStore.set(name, res.data as resType);
        });
        await sleep(1000);
      }
    };
    timerList.push(setInterval(req, interval));
    // 先执行一次所有请求
    await req();
  }
};

export const stopJobs = () => {
  for (const timer of timerList) {
    clearInterval(timer);
  }
};
