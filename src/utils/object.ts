export function getQueryFromUrl<T>(url: string): T {
  const [_, queryString] = url.split("?");
  const queryObject = Object.fromEntries(new URLSearchParams(queryString));
  return convertTo<T>(queryObject);
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

export function convertToQueryString(obj: Record<string, any>): string {
  const params = Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
  return new URLSearchParams(params).toString();
}
