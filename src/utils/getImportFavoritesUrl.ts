import ROUTES from '../data/routes';
import STORAGE_KEYS from '../data/storageKeys';

const getImportFavoritesUrl = () => {
  const favString = localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]';
  const url = new URL(ROUTES.IMPORT_FAVORITES, window.location.origin);
  url.searchParams.set('id', favString);
  const finalUrl = url.toString();

  return finalUrl;
};

export default getImportFavoritesUrl;
