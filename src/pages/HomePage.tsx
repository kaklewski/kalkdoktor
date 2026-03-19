import { useEffect, useState } from 'react';

import SortButton from '../components/buttons/SortButton';
import { sortedCalculators } from '../data/calculators';
import STORAGE_KEYS from '../data/storageKeys';
import STRINGS from '../data/strings';
import CalculatorCollectionLayout from '../layouts/CalculatorCollectionLayout';

const HomePage = () => {
    const [sorting, setSorting] = useState<string>(
        localStorage.getItem(STORAGE_KEYS.SORT.HOMEPAGE) ||
            STORAGE_KEYS.SORT.ALPHABETICALLY,
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SORT.HOMEPAGE, sorting);
    }, [sorting]);

    const buttons = <SortButton sorting={sorting} setSorting={setSorting} />;

    return (
        <CalculatorCollectionLayout
            title={STRINGS.PAGES.HOME.TITLE}
            actions={buttons}
            sorting={sorting}
            calculators={sortedCalculators}
        />
    );
};

export default HomePage;
