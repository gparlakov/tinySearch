import { useState } from 'react';
import { Results } from './results/results';
import Search from './search/search';
import useSearchAutocomplete, {
  City,
} from './use-search-autocomplete/use-search-autocomplete';

export function App() {
  // configure via /config.json 

  const { query, autocomplete } = useSearchAutocomplete(
    'http://localhost:3333/q',
    'http://localhost:3333/autocomplete'
  );

  const [results, setResults] = useState<City[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <div>
      <Search
        onSearch={async (q) => {
          const results = await query(q);

          setResults(results);
          setSuggestions([]);
        }}
        onType={async (q) => {
          const suggestions = await autocomplete(q)
          setSuggestions(suggestions);
        }}
        suggestions={suggestions}
      />
      <Results results={results} />
    </div>
  );
}

export default App;
