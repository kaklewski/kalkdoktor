import ROUTES from '../data/routes';
import STORAGE_KEYS from '../data/storageKeys';
import { CalculatorType } from '../types/calculatorTypes';

const getCategories = (calculators: CalculatorType[]) => {
    const categoriesArray: string[] = [];

    calculators.forEach((calculator) => {
        if (!categoriesArray.includes(calculator.category)) {
            categoriesArray.push(calculator.category);
        }
    });

    return categoriesArray.sort();
};

const getImportFavoritesUrl = () => {
    const favString = localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]';
    const url = new URL(ROUTES.IMPORT_FAVORITES, window.location.origin);
    url.searchParams.set('id', favString);
    const finalUrl = url.toString();

    return finalUrl;
};

const sumValues = (values: Record<string, string>) => {
    const initialSum: number = 0;

    return Object.values(values).reduce((sum, value) => {
        const number = parseFloat(value);
        return !isNaN(number) ? sum + number : sum;
    }, initialSum);
};

export { getCategories, getImportFavoritesUrl, sumValues };
