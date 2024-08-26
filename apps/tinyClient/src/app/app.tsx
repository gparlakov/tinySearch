import { useState } from 'react';
import { Results } from './results/results';
import Search from './search/search';
import useSearchAutocomplete, {
  City,
} from './use-search-autocomplete/use-search-autocomplete';

export function App() {
  const { query } = useSearchAutocomplete();

  const [results, setResults] = useState<City[]>([]);

  return (
    <div>
      <Search
        onSearch={async (q) => {
          const results = await query(q);

          setResults(results);
        }}
        onType={(q) => console.log('---typing', q)}
      />
      <Results results={results} />
    </div>
  );
}

export default App;
