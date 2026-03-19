import ROUTES from '../data/routes';
import STORAGE_KEYS from '../data/storageKeys';
import { CalculatorModel } from '../types/calculatorModels';

const titleCaseWords = (text: string) =>
    text.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const checkIsStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches;

const getCategories = (calculators: CalculatorModel[]) => {
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

export {
    checkIsStandaloneMode,
    getCategories,
    getImportFavoritesUrl,
    sumValues,
    titleCaseWords,
};
