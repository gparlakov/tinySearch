import { useState } from 'react';
import { Results } from './results/results';
import Search from './search/search';
import useSearchAutocomplete, {
  City,
} from './use-search-autocomplete/use-search-autocomplete';
import { useSearchHistory } from './use-search-history/use-search-history';
import SearchHistory from './search-history/search-history';

export function App() {
  // configure via /config.json

  const [query, setQuery] = useState('');

  const { query: doQuery, autocomplete } = useSearchAutocomplete(
    'http://localhost:3333/q',
    'http://localhost:3333/autocomplete'
  );

  const [results, setResults] = useState<City[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { clearHistory, queries, storeQuery } = useSearchHistory();

  async function onSearch(q: string) {
    const results = await doQuery(q);

    setResults(results);
    setSuggestions([]);
    storeQuery(q, results.length);
  }
  return (
    <div>
      <Search
        onSearch={onSearch}
        onType={async (q) => {
          const suggestions = await autocomplete(q);
          setSuggestions(suggestions);
        }}
        suggestions={suggestions}
        query={query}
        setQuery={setQuery}
      >
        <SearchHistory
          queries={queries}
          clearHistory={clearHistory}
          redoSearch={(q) => {
            setQuery(q);
            onSearch(q)
          }}
          className="absolute right-0 top-0"
        />
      </Search>

      <Results results={results} />
    </div>
  );
}

export default App;
