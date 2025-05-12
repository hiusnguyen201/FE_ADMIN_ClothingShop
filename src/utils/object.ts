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

export function filterTruthyValues(record: Record<string, any>) {
  return Object.fromEntries(Object.entries(record).filter(([_, value]) => Boolean(value)));
}

export function convertToSearchParams(obj: Record<string, any>): URLSearchParams {
  const params = Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
  return new URLSearchParams(params);
}

export function downloadFileBlob(data: Blob, fileName: string): void {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
