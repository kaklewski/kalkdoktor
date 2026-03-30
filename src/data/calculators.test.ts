import { describe, expect, it } from 'vitest';

import { calculatorMap } from './calculators';

describe('1. Kalkulator BMI', () => {
    it('should return BMI value', () => {
        const calculateBmi = calculatorMap.get(1)?.calculateResult;
        const data = { bodyMass: '74', height: '184' };

        if (!calculateBmi) {
            throw new Error(
                'Kalkulator BMI doesnt have the calculateResult function',
            );
        }

        const result = calculateBmi(data);

        expect(result[0]).toBe(22);
    });
});

describe('5. Kalkulator liczby opakowań leków na dany okres', () => {
    it('should return number of packages', () => {
        const calculatePackages = calculatorMap.get(5)?.calculateResult;
        const data = {
            amountPerIntake: '3',
            numberOfIntakes: '3',
            daysOfUse: '5',
            packageSize: '10',
        };

        if (!calculatePackages) {
            throw new Error(
                'Kalkulator liczby opakowań leków na dany okres doesnt have the calculateResult function',
            );
        }

        const result = calculatePackages(data);

        expect(result[0]).toBe(5);
    });
});

