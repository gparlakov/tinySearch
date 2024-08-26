import { cities } from './cities';

const tokens = [
  // unique array of
  ...new Set(
    // all city names
    cities
      // that are strings
      .filter((c) => typeof c.cityLabel === 'string')
      // split on whitespace to get the words/tokens
      .flatMap((c) => c.cityLabel.split('/s/'))
  ),
  // order tokens alphabetically
].sort((a, b) => a.localeCompare(b));

export function search({ q }: { q?: string } = { q: '' }) {
  const qNormal = typeof q === 'string' ? q.toLocaleLowerCase() : '';

  const result = cities.filter(
    (c) =>
      typeof c.cityLabel === 'string' &&
      c.cityLabel.toLocaleLowerCase().includes(qNormal)
  );
  return result;
}

export function autocomplete({ q }: { q?: string } = { q: '' }) {
  const qNormal = typeof q === 'string' ? q.toLocaleLowerCase() : '';

  return tokens.filter((t) => t.toLocaleLowerCase().startsWith(qNormal));
}
