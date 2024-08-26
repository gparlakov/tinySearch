import { useState } from 'react';

const key = 'tiny-client-search-history';

export interface SearchMemo {
  q: string;
  count: number;
}

export function useSearchHistory() {
  // initialize from local storage
  const history = localStorage.getItem(key);
  const queriesStored: SearchMemo[] =
    typeof history === 'string' ? JSON.parse(history) : [];

  const [queries, setQueries] = useState(queriesStored);

  function storeQuery(q: string, resultsCount: number) {
    if (queries.some((memo) => memo.q === q)) {
      // already in
      return;
    }

    const newHistory = [...queries, { q, count: resultsCount }];

    setQueries(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  }

  function clearHistory() {
    setQueries([]);
    localStorage.setItem(key, JSON.stringify([]));
  }

  return { queries, storeQuery, clearHistory };
}
