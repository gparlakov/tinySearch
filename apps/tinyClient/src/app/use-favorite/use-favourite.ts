import { useState } from 'react';

const favoritesKey = 'tiny-client-favorites';

export function useFavorite() {
  // initialize from local storage
  const favs = localStorage.getItem(favoritesKey);
  const ids = typeof favs === 'string' ? favs.split('/,/') : [];
  console.log('----ids', ids)

  const [favorites, setFav] = useState(ids);

  function setFavorite(id: string) {
    const newFavs = !favorites.includes(id)
      ? [...favorites, id]
      : favorites.filter((idIn) => idIn != id);

    setFav(newFavs);
    localStorage.setItem(favoritesKey, newFavs.join(','));
  }

  return { favorites, setFavorite };
}
