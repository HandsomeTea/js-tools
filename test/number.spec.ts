import * as number from '../src/number';

describe('number', () => {
    test('fixedNumString', () => {
        expect(number.fixedNumString(123)).toBe('123');
        expect(number.fixedNumString('123')).toBe('123');
        expect(number.fixedNumString(1)).toBe('01');
        expect(number.fixedNumString('1')).toBe('01');
        expect(number.fixedNumString('')).toBe('00');
        expect(number.fixedNumString(0)).toBe('00');
        expect(number.fixedNumString(12)).toBe('12');
        expect(number.fixedNumString('12')).toBe('12');
        expect(number.fixedNumString('12', 3)).toBe('012');
        expect(number.fixedNumString(12, 3)).toBe('012');
    });
});
