const HISTORY_KEY = "previousPages";

export type HistoryItem = {
  url: string;
  browserTime: number;
};

export const getHistory = (): HistoryItem[] => {
  const history = sessionStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const setHistory = (url: string): void => {
  const history = getHistory();
  const lastEntry = history[history.length - 1];

  if (lastEntry?.url === url) return;

  const newEntry: HistoryItem = { url, browserTime: Date.now() };
  const updatedHistory = lastEntry ? [lastEntry, newEntry] : [newEntry];

  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const matchPreviousHistory = (pathname: string): boolean => {
  const history = getHistory();
  const previous = history[history.length - 1];
  if (!previous) return false;
  return previous.url.split("?")[0] === pathname;
};

export const getPreviousPathnameHistory = (): string | undefined => {
  const history = getHistory();
  return history[history.length - 1]?.url;
};
