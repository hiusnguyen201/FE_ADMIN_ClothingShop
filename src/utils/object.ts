export function filteredObj(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
}

export function getUrlParams<T>(urlString: string): T {
  const url: URL = new URL(urlString);
  const urlSearchParams: URLSearchParams = new URLSearchParams(url.searchParams);
  const params: Record<string, string> = Object.fromEntries(urlSearchParams.entries());
  return convertTo<T>(params);
}

export function convertTo<T>(record: Record<string, string>): T {
  const result: Partial<T> = {};

  Object.entries(record).forEach(([key, value]) => {
    try {
      result[key as keyof T] = JSON.parse(value);
    } catch {
      result[key as keyof T] = value as any;
    }
  });

  return result as T;
}
