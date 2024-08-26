import { useFavorite } from '../use-favorite/use-favourite';

export type ResultsProps = {
  results: {
    url: string;
    cityLabel: string;
    population: number;
  }[];
};
export function Results({ results }: ResultsProps) {
  const { favorites, setFavorite } = useFavorite();

  console.log('-----',favorites)

  return results.map((r) => (
    <div>
      <a href={r.url} className="link">
        {r.cityLabel}
      </a>
      <span>Population: {r.population}</span>
      <button className="btn" onClick={() => setFavorite(r.url)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={favorites.includes(r.url) ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  ));
}
