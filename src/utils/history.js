const HISTORY_KEY = "previousPages";

export const getHistory = () => {
  return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || [];
};

export const saveHistory = (url) => {
  let history = JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || [];

  if (history.at(-1).url === url) return;

  if (history.length > 0) {
    history = [history.at(-1), { url, browser_time: Date.now() }];
  } else {
    history = [{ url, browser_time: Date.now() }];
  }

  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};
