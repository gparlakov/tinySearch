import { SearchMemo } from '../use-search-history/use-search-history';

export type SearchHistoryProps = {
  queries: SearchMemo[];
  clearHistory: () => void;
  redoSearch: (q: string) => void;
  className?: string;
};
export function SearchHistory({
  queries,
  clearHistory,
  redoSearch,
  className,
}: SearchHistoryProps) {
  return (
    <details className={`dropdown ${className}`}>
      <summary className="btn m-1">Search History</summary>
      <ul className="dropdown-content bg-base-100 rounded-box z-[1] w-64 p-2 shadow  right-0">
        {queries.map((q) => (
          <li>
            <a>{q.q}</a> Results: {q.count}{' '}
            <button className="btn" onClick={() => redoSearch(q.q)}>
              redo
            </button>
          </li>
        ))}
        {queries.length === 0 && <li>History is Empty</li>}
        {queries.length > 0 && (
          <li>
            <button className="btn" onClick={() => clearHistory()}>
              Clear History
            </button>
          </li>
        )}
      </ul>
    </details>
  );
}

export default SearchHistory;
