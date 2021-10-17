import qs from 'qs';

import axios from './interceptor';
import { RequestConfig, RequestConfigList, RESTFUL_API_METHODS } from './types';

export function makeRequest<T> (config: RequestConfigList, reqName: keyof RequestConfigList['requests']) {
  const requestConfig: RequestConfig | undefined = config.requests[reqName];
  const method: RESTFUL_API_METHODS = (
      (requestConfig.method === 'common' ? config.common?.method : requestConfig.method) as RESTFUL_API_METHODS | undefined
    )
    || 'post';
  const url = (requestConfig.url === 'common' ? config.common?.url : requestConfig.url) || '';
  const defaultHeaders = {
    'Content-Type': ''
  };
  const headers: { ['Content-Type']?: string } = { ...defaultHeaders, ...((requestConfig.headers === 'common' ? config.common?.headers : requestConfig.headers) as Record<string, unknown> || {}) };
  const bodyObj = (requestConfig.body === 'common' ? config.common?.body : requestConfig.body) || {};
  const body = headers['Content-Type'] === 'application/x-www-form-urlencoded' ? qs.stringify(bodyObj) : bodyObj;
  if (headers['Content-Type'] === '') {
    delete headers['Content-Type'];
  }
  return axios[method]<T>(url, body, {
    headers
  });
}
