const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const DEFAULT_LANGUAGE = 'ru-RU';

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return c.json();
  }

  if (contentType && contentType.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl);

  url.searchParams.set('api_key', API_KEY);

  if (!url.searchParams.has('language')) {
    url.searchParams.set('language', DEFAULT_LANGUAGE);
  }

  const pathname = url.pathname;
  const search = url.search;
  const baseUrl = 'https://api.themoviedb.org'

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
  };
};

export const appFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};