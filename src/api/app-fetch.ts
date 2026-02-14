const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const appFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const finalUrl = new URL(url, window.location.origin);
  finalUrl.searchParams.append('api_key', API_KEY);

  const response = await fetch(finalUrl.toString(), options);

  if (!response.ok) {
    throw new Error('API error');
  }

  return response.json();
};