import { useState } from 'react';

export type SearchProps = {
  onSearch: (q: string) => void;
  
  placeholder?: string;
  initialQuery?: string;
  suggestions?: string[];
  onType?: (q: string) => void;
};
export function Search({
  placeholder,
  onSearch,
  initialQuery,
  suggestions,
  onType,
}: SearchProps) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const onTypeCb = typeof onType === 'function' ? onType : () => {};
  return (
    <>
      <form
        onSubmit={(e) => {
          onSearch(query);
          e.preventDefault();
        }}
      >
        <input
          placeholder={placeholder ?? 'Search'}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            onTypeCb(v);
          }}
        />
        <button>Search</button>
      </form>
      {suggestions?.map((s) => (
        <div>{s}</div>
      ))}
    </>
  );
}

export default Search;
