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
  let history: HistoryItem[] = getHistory();

  if (history[history.length - 1]?.url === url) return;

  if (history.length > 0) {
    history = [history[history.length - 1], { url, browserTime: Date.now() }];
  } else {
    history = [{ url, browserTime: Date.now() }];
  }

  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};
