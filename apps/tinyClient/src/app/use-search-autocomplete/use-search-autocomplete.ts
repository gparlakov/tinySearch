import { useState, useCallback } from 'react';

export interface City {
  url: string;
  cityLabel: string;
  population: number;
} 

export interface UseSearchAutocomplete {
  query: (q: string) => Promise<City[]>;
}

export function useSearchAutocomplete(): UseSearchAutocomplete {
  const query = (q: string) => {
    return fetch('http://localhost:3333/q', {
      method: 'POST',
      body: JSON.stringify({ q: q }),
      headers: { 'Content-Type': 'application/json' },
    }).then((r) => r.json());
  };

  return { query };
}

export default useSearchAutocomplete;
