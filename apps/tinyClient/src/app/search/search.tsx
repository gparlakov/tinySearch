import { useState } from 'react';

export type SearchProps = {
  onSearch: (q: string) => void;

  placeholder?: string;
  initialQuery?: string;
  suggestions?: string[];
  onType?: (q: string) => void;
  children?: any;
};
export function Search({
  placeholder,
  onSearch,
  initialQuery,
  suggestions,
  onType,
  children,
}: SearchProps) {
  const [query, setQuery] = useState(initialQuery ?? '');

  const max = 15;
  const { highlighted, onKey, setHighlighted } = useHighlight(
    0,
    suggestions,
    (selected) => {
      setQuery(selected);
      onSearch(selected);
    },
    max
  );

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
          className="input input-bordered w-full max-w-xs"
          placeholder={placeholder ?? 'Search'}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            onTypeCb(v);
            setHighlighted(0);
          }}
          onKeyDown={(e) => onKey(e.key)}
          value={query}
        />
        <button className="btn btn-primary">Search</button>
      </form>
      {children}
      {suggestions && suggestions.length > 0 && (
        <div className="dropdown dropdown-open">
          <ul className="overflow-auto dropdown-content bg-base-100 opacity-85 rounded-box z-[1] w-52 max-w-80 p-2 shadow">
            {suggestions
              .filter((_, i) => i < max)
              .map((s, i) => (
                <li className={i === highlighted ? 'bg-accent' : ''}>
                  <a>{s}</a>
                </li>
              ))}
            {suggestions.length > max && (
              <li>
                <a>...and {suggestions.length - max} more</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

function useHighlight(
  initial: number = 0,
  suggestions: string[] = [],
  onSelected?: (s: string) => void,
  maxShow?: number
) {
  const [highlighted, setHighlighted] = useState(initial);

  const max = typeof maxShow === 'number' ? maxShow : suggestions.length;

  const onKey = (key: string) => {
    switch (key) {
      case 'ArrowUp': {
        if (highlighted > 0) {
          setHighlighted(highlighted - 1);
        } else {
          setHighlighted(max - 1);
        }
        break;
      }
      case 'ArrowDown': {
        if (highlighted < max - 1) {
          setHighlighted(highlighted + 1);
        } else {
          setHighlighted(0);
        }
        break;
      }
      case 'Enter': {
        typeof onSelected === 'function' &&
          onSelected(suggestions[highlighted]);
      }
      case 'Esc': {
      }
    }
  };

  return { highlighted, onKey, setHighlighted };
}

export default Search;
