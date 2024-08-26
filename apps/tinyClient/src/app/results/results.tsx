export type ResultsProps = {
  results: {
    url: string;
    cityLabel: string;
    population: number;
  }[];
};
export function Results({ results }: ResultsProps) {
  return results.map((r) => (
    <div>
      <a href={r.url}>{r.cityLabel}</a> <span>Population: {r.population}</span>
    </div>
  ));
}
