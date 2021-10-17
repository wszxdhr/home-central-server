export interface RequestConfigList {
  common: RequestConfig;
  requests: Record<string, RequestConfig>;
}

export type RESTFUL_API_METHODS = 'get' | 'post' | 'put' | 'delete' | 'head';

export interface RequestConfig {
  url?: string;
  method?: string;
  headers?: unknown;
  body?: unknown;
  // 请求（拿回来缓存）间隔时间（ms）
  interval: string;
}

export interface RequestHeader {
  [key: string]: string | number | Array<unknown> | { [k: string]: any } | null | undefined;
}
