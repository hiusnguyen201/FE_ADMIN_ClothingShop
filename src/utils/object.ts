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

export function sortObjectByKeys(obj: Record<string, any>) {
  return Object.keys(obj)
    .sort()
    .reduce((acc: Record<string, any>, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

export function compareObjects(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  const sorted1 = sortObjectByKeys(obj1);
  const sorted2 = sortObjectByKeys(obj2);

  const json1 = JSON.stringify(sorted1);
  const json2 = JSON.stringify(sorted2);

  return json1 === json2;
}

function parseValue(value: string): any {
  if (value === "true") return true;
  if (value === "false") return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

export function getTypedParams(searchParams: URLSearchParams): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = parseValue(value);
  }
  return obj;
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
