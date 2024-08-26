import { useState, useCallback } from 'react';

export interface City {
  url: string;
  cityLabel: string;
  population: number;
}

export interface UseSearchAutocomplete {
  query: (q: string) => Promise<City[]>;
  autocomplete: (q: string) => Promise<string[]>;
}

export function useSearchAutocomplete(
  searchUrl: string,
  autocompleteUrl: string
): UseSearchAutocomplete {
  const query = (q: string) => {
    return fetch(searchUrl, {
      method: 'POST',
      body: JSON.stringify({ q: q }),
      headers: { 'Content-Type': 'application/json' },
    }).then((r) => r.json());
  };

  const autocomplete = (q: string) => {
    return fetch(autocompleteUrl, {
      method: 'POST',
      body: JSON.stringify({ q: q, page: 100 }),
      headers: { 'Content-Type': 'application/json' },
    }).then((r) => r.json());
  };

  return { query, autocomplete };
}

export default useSearchAutocomplete;
